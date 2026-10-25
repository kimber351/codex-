import { useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getUserSession, setUserSession } from '../../core/learning'
import './index.scss'

export default function HomePage() {
  const existing = getUserSession()
  const [mode, setMode] = useState<'guest' | 'login'>(existing.mode)
  const [phone, setPhone] = useState(existing.phone || '')
  const [code, setCode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [loginReady, setLoginReady] = useState(existing.mode === 'login')
  const start = () => {
    if (!loginReady && mode === 'login') { Taro.showToast({ title: '请先完成手机号验证', icon: 'none' }); return }
    if (mode === 'guest') setUserSession({ mode: 'guest' })
    Taro.navigateTo({ url: '/pages/module/index?moduleId=M1&stageId=intro' })
  }
  const enterGuest = () => { setMode('guest'); setLoginReady(false); setUserSession({ mode: 'guest' }); Taro.showToast({ title: '游客模式：手动保存进度', icon: 'none' }) }
  const sendCode = () => {
    if (!/^1\d{10}$/.test(phone)) { Taro.showToast({ title: '请输入有效的 11 位手机号', icon: 'none' }); return }
    setSentCode('123456')
    Taro.showToast({ title: '验证码已发送（演示码 123456）', icon: 'none' })
  }
  const verify = () => {
    if (!sentCode || code !== sentCode) { Taro.showToast({ title: '验证码不正确', icon: 'none' }); return }
    setUserSession({ mode: 'login', phone, loggedInAt: new Date().toISOString() })
    setLoginReady(true)
    Taro.showToast({ title: '登录成功，进度自动保存', icon: 'success' })
  }
  return <View className="home-page">
    <View className="home-hero-copy"><Text className="eyebrow">INTERACTIVE SCIENCE LAB · 01</Text><Text className="brand-title">通微智药</Text><Text className="brand-subtitle">中药相关膜蛋白分子机制探究</Text><Text className="brand-description">探索中药活性成分与膜蛋白之间的分子作用机制。</Text></View>
    <View className="mode-panel"><Text className="mode-title">选择进入方式</Text><View className="mode-tabs"><Button className={`mode-tab ${mode === 'guest' ? 'active' : ''}`} onClick={enterGuest}>游客模式</Button><Button className={`mode-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>手机号登录</Button></View>{mode === 'guest' ? <Text className="mode-note">游客进度只在点击“手动保存进度”后保存</Text> : <View className="login-form"><View className="input-row"><Text>手机号</Text><Input className="login-input" type="number" maxlength={11} placeholder="请输入手机号" value={phone} onInput={(event) => setPhone(event.detail.value)} /></View><View className="input-row"><Text>验证码</Text><Input className="login-input" type="number" maxlength={6} placeholder="请输入验证码" value={code} onInput={(event) => setCode(event.detail.value)} /><Button className="send-code" onClick={sendCode}>获取验证码</Button></View><Button className="verify-button" onClick={verify}>{loginReady ? '已登录' : '验证并登录'}</Button></View>}</View>
    <View className="hero-scene"><View className="scene-orbit orbit-one" /><View className="scene-orbit orbit-two" /><View className="hero-mailbox"><View className="hero-flag" /><View className="hero-shell"><View className="hero-opening" /></View><View className="hero-pole" /><View className="hero-base" /></View><View className="hero-g"><Text>G</Text><View className="hero-eye e1" /><View className="hero-eye e2" /></View><View className="hero-channel"><View className="hero-channel-hole" /><Text>⌁</Text></View><View className="scene-label label-mail">GPCR · 邮箱</View><View className="scene-label label-g">G 蛋白 · 传信员</View><View className="scene-label label-channel">离子通道 · 天线</View></View>
    <Button className="explore-button" onClick={start}>开始探索 <Text>→</Text></Button>
    <View className="role-strip"><View className="role-card"><View className="role-dot role-mail-dot" /><Text>邮箱</Text><Text>GPCR 信号接收</Text></View><View className="role-card"><View className="role-dot role-g-dot">G</View><Text>传信员</Text><Text>G 蛋白信号传递</Text></View><View className="role-card"><View className="role-dot role-channel-dot">⌁</View><Text>天线</Text><Text>离子通道响应</Text></View></View>
    <Text className="home-footnote">进入后可分别操作邮箱、传信员和天线，观察信号如何抵达细胞内部。</Text>
  </View>
}
