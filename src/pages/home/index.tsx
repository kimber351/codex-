import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function HomePage() {
  const start = () => Taro.navigateTo({ url: '/pages/module/index?moduleId=M1&stageId=intro' })
  return <View className="home-page">
    <View className="home-hero-copy"><Text className="eyebrow">INTERACTIVE SCIENCE LAB · 01</Text><Text className="brand-title">通微智药</Text><Text className="brand-subtitle">中药相关膜蛋白分子机制探究</Text><Text className="brand-description">探索中药活性成分与膜蛋白之间的分子作用机制。</Text></View>
    <View className="hero-scene">
      <View className="scene-orbit orbit-one" /><View className="scene-orbit orbit-two" />
      <View className="hero-mailbox"><View className="hero-flag" /><View className="hero-shell"><View className="hero-opening" /></View><View className="hero-pole" /><View className="hero-base" /></View>
      <View className="hero-g"><Text>G</Text><View className="hero-eye e1" /><View className="hero-eye e2" /></View>
      <View className="hero-channel"><View className="hero-channel-hole" /><Text>⌁</Text></View>
      <View className="scene-label label-mail">GPCR · 邮箱</View><View className="scene-label label-g">G 蛋白 · 传信员</View><View className="scene-label label-channel">离子通道 · 天线</View>
    </View>
    <Button className="explore-button" onClick={start}>开始探索 <Text>→</Text></Button>
    <View className="role-strip"><View className="role-card"><View className="role-dot role-mail-dot" /><Text>邮箱</Text><Text>GPCR 信号接收</Text></View><View className="role-card"><View className="role-dot role-g-dot">G</View><Text>传信员</Text><Text>G 蛋白信号传递</Text></View><View className="role-card"><View className="role-dot role-channel-dot">⌁</View><Text>天线</Text><Text>离子通道响应</Text></View></View>
    <Text className="home-footnote">进入后可分别操作邮箱、传信员和天线，观察信号如何抵达细胞内部。</Text>
  </View>
}
