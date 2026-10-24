import { useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { modules } from '../../data/modules'
import { getLearningState, isModuleUnlocked, ModuleId } from '../../core/learning'
import './index.scss'

export default function HomePage() {
  const [completed] = useState(getLearningState().completedModules)
  const start = () => Taro.navigateTo({ url: '/pages/module/index?moduleId=M1&stageId=intro' })
  const openModule = (id: ModuleId) => {
    if (!isModuleUnlocked(id, completed)) { Taro.showToast({ title: '请先完成前置模块', icon: 'none' }); return }
    Taro.navigateTo({ url: `/pages/module/index?moduleId=${id}&stageId=intro` })
  }
  return <View className="home-page">
    <View className="home-hero-copy"><Text className="eyebrow">INTERACTIVE SCIENCE LAB · 01</Text><Text className="brand-title">通微智药</Text><Text className="brand-subtitle">中药相关膜蛋白分子机制探究</Text><Text className="brand-description">探索中药活性成分与膜蛋白之间的分子作用机制。</Text></View>
    <View className="hero-scene">
      <View className="scene-orbit orbit-one" /><View className="scene-orbit orbit-two" />
      <View className="hero-mailbox"><View className="hero-flag" /><View className="hero-shell"><View className="hero-opening" /></View><View className="hero-pole" /><View className="hero-base" /></View>
      <View className="hero-g"><Text>G</Text><View className="hero-eye e1" /><View className="hero-eye e2" /></View>
      <View className="hero-channel"><View className="hero-channel-hole" /><Text>⌁</Text></View>
      <View className="scene-label label-mail">GPCR · 信箱</View><View className="scene-label label-g">G 蛋白 · 传信员</View><View className="scene-label label-channel">离子通道 · 天线</View>
    </View>
    <Button className="explore-button" onClick={start}>开始探索 <Text>→</Text></Button>
    <View className="modules-intro"><Text className="section-kicker">LEARNING PATH</Text><Text className="section-title">六个模块，逐步读懂分子信号</Text></View>
    <View className="module-grid">{modules.map((item) => { const unlocked = isModuleUnlocked(item.id, completed); return <View key={item.id} className={`module-card ${unlocked ? 'unlocked' : 'locked'}`} onClick={() => openModule(item.id)}><View className="module-icon">{item.icon}</View><Text className="module-id">{item.id}</Text><Text className="module-title">{item.title}</Text><Text className="module-description">{item.description}</Text><Text className="module-access">{unlocked ? '可进入  →' : '完成前置模块后解锁  ·  🔒'}</Text></View> })}</View>
    <Text className="home-footnote">从科学概念出发，用可视化的方式理解信号如何抵达细胞内部。</Text>
  </View>
}
