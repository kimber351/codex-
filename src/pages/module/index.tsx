import { useMemo, useRef, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { GProtein, GProteinStatus } from '../../components/GProtein'
import { IonChannel, IonStatus } from '../../components/IonChannel'
import { Mailbox, MailboxStatus } from '../../components/Mailbox'
import { channels, gpcrs } from '../../data/science'
import { getLearningState, getUserSession, saveLearningState } from '../../core/learning'
import './index.scss'

export default function ModulePage() {
  const router = useRouter()
  const moduleId = (router.params.moduleId || 'M1') as string
  const [mailStates, setMailStates] = useState<Record<string, MailboxStatus>>({})
  const [gStatus, setGStatus] = useState<GProteinStatus>('idle')
  const [channelStates, setChannelStates] = useState<Record<string, IonStatus>>({})
  const [advanced, setAdvanced] = useState(false)
  const title = moduleId === 'M1' ? '认识信箱和天线' : '模块学习空间'
  const selectedMailbox = useMemo(() => gpcrs.find((item) => mailStates[item.id] === 'activated'), [mailStates])
  const animationTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const session = getUserSession()
  const handleMailboxStatus = (id: string, status: MailboxStatus) => {
    setMailStates((prev) => ({ ...prev, [id]: status }))
    if (status === 'blocked') setGStatus('blocked')
    if (status === 'resetting') setGStatus('reset')
    if (session.mode === 'login') saveLearningState({ selectedTarget: id, isAnimating: status === 'receiving' })
  }
  const selectChannel = (id: string) => {
    const next = channelStates[id] === 'active' ? 'reset' : 'active'
    setChannelStates((prev) => ({ ...prev, [id]: next }))
    if (session.mode === 'login') saveLearningState({ selectedTarget: id })
  }
  const runMessenger = () => {
    if (!selectedMailbox) { Taro.showToast({ title: '请先投递一个邮箱信号', icon: 'none' }); return }
    animationTimers.current.forEach(clearTimeout)
    setGStatus('receive')
    animationTimers.current = [setTimeout(() => setGStatus('activate'), 600), setTimeout(() => setGStatus('move'), 1250), setTimeout(() => setGStatus('deliver'), 2000)]
    if (session.mode === 'login') saveLearningState({ isAnimating: true, selectedTarget: selectedMailbox.id })
  }
  const finish = () => { const state = getLearningState(); if (!state.completedModules.includes('M1')) saveLearningState({ completedModules: [...state.completedModules, 'M1'], moduleId: 'M1', stageId: 'complete', userMode: session.mode, isAnimating: false }); else if (session.mode === 'login') saveLearningState({ stageId: 'complete', isAnimating: false }); Taro.showToast({ title: 'M1 学习进度已保存', icon: 'success' }) }
  return <View className="module-page">
    <View className="module-topbar"><Text className="back-link" onClick={() => Taro.reLaunch({ url: '/pages/home/index' })}>← 回到首页</Text><Text className="saved-state">{session.mode === 'login' ? '登录模式 · 自动保存' : '游客模式 · 手动保存'}</Text></View>
    <View className="module-heading"><Text className="section-kicker">MODULE {moduleId}</Text><Text className="module-page-title">{title}</Text><Text className="module-page-lead">把抽象的膜蛋白机制，拆解成可以观察和操作的信号角色。</Text></View>
    <View className="learning-progress"><View className="progress-label"><Text>当前学习阶段</Text><Text>1 / 3 · 基础组件</Text></View><View className="progress-track"><View className="progress-value" /></View></View>
    <View className="notice-card"><View className="notice-icon">i</View><View><Text className="notice-title">科学提示</Text><Text className="notice-text">“信箱”“天线”“传信员”是帮助理解的拟人化表达，对应真实的 GPCR、离子通道和 G 蛋白。</Text></View></View>
    <View className="stage-heading"><Text className="stage-title">A · GPCR 信箱</Text><Text className="stage-caption">每个受体都能独立接收、阻断和复位信号</Text></View>
    <View className="gpcr-grid">{gpcrs.map((item) => <Mailbox key={item.id} {...item} status={mailStates[item.id] || 'idle'} onStatusChange={(status) => handleMailboxStatus(item.id, status)} />)}</View>
    <View className="stage-heading"><Text className="stage-title">B · G 蛋白传信员</Text><Text className="stage-caption">先激活一个邮箱，再点击传信员；它会接收信号、背起信袋并沿路线完成传信。</Text></View>
    <GProtein status={gStatus} onClick={runMessenger} />
    <View className="stage-heading"><Text className="stage-title">C · 离子通道天线</Text><Text className="stage-caption">点击通道卡片查看独立的开放示意；尚未配置的离子流方向不会被臆测。</Text></View>
    <View className="channel-grid">{channels.map((item) => <IonChannel key={item.id} {...item} status={channelStates[item.id] || 'idle'} onSelect={() => selectChannel(item.id)} />)}</View>
    <View className="stage-heading"><Text className="stage-title">D · 分子与信号基础组件</Text></View>
    <View className="signal-lab"><View className="lab-letter">✦</View><Text className="lab-arrow">→</Text><View className="lab-target">◎</View><View className="lab-copy"><Text className="component-name">简化信件分子 · 目标选择</Text><Text className="component-meta">基础实验室用于演示匹配成功和信号粒子，不包含正式 M2/M3 剧情。</Text></View></View>
    <View className="knowledge-actions"><Button className="knowledge-toggle" onClick={() => setAdvanced(!advanced)}>{advanced ? '收起进阶知识' : '打开进阶知识'}</Button><Button className="finish-button" onClick={finish}>{session.mode === 'login' ? '保存当前进度' : '手动保存进度'}</Button></View>
    {advanced && <View className="knowledge-card"><Text className="knowledge-title">从拟人化到专业概念</Text><Text className="knowledge-text">G 蛋白偶联受体（GPCR）是细胞膜上的受体家族；G 蛋白参与细胞内信号转导；离子通道通过开放状态变化参与细胞兴奋与调节。不同受体和通道的具体药理作用需结合已审核的科学案例。</Text></View>}
    <View className="module-nav"><Button className="nav-button" onClick={() => Taro.reLaunch({ url: '/pages/home/index' })}>回到首页</Button><Button className="nav-button primary" onClick={finish}>完成本阶段 →</Button></View>
  </View>
}
