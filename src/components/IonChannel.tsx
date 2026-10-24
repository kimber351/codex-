import { Text, View } from '@tarojs/components'
import './science-components.scss'
export type IonStatus = 'idle' | 'selected' | 'active' | 'inhibited' | 'reset'
export const IonChannel = ({ name, label, color, detail, status, onSelect }: { name: string; label: string; color: string; detail: string; status: IonStatus; onSelect: () => void }) => <View className={`channel-card channel-${status}`} style={{ '--channel-color': color } as React.CSSProperties} onClick={onSelect}>
  <View className="channel-art"><View className="membrane membrane-top" /><View className="channel-pore"><View className="ion-dot" /></View><View className="membrane membrane-bottom" /><View className="signal-wave">⌁</View></View>
  <Text className="component-name">{name}</Text><Text className="component-label">{label}</Text><Text className="component-meta">{status === 'active' ? detail : '点击查看基础科普动画'}</Text>
  <Text className="channel-status">{status === 'inhibited' ? '已调节' : status === 'active' ? '通道开放示意' : '待探索'}</Text>
</View>
