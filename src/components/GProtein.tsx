import { useEffect, useState } from 'react'
import { Text, View } from '@tarojs/components'
import './science-components.scss'
export type GProteinStatus = 'idle' | 'receive' | 'activate' | 'move' | 'deliver' | 'blocked' | 'reset'
export const GProtein = ({ status = 'idle', onClick }: { status?: GProteinStatus; onClick?: () => void }) => {
  const [local, setLocal] = useState<GProteinStatus>(status)
  useEffect(() => setLocal(status), [status])
  return <View className={`g-protein-panel g-${local} ${onClick ? 'g-clickable' : ''}`} onClick={onClick}>
    <View className="g-route"><View className="g-route-line" /><Text>信号传递路线</Text></View>
    <View className="g-character"><View className="g-hat" /><View className="g-arm g-arm-left" /><View className="g-arm g-arm-right" /><View className="g-body"><View className="g-eye eye-left" /><View className="g-eye eye-right" /><Text className="g-letter">G</Text><View className="g-smile" /><View className="g-badge">✦</View></View><View className="g-bag" /><View className="g-foot foot-left" /><View className="g-foot foot-right" /></View>
    <Text className="g-state">{local === 'blocked' ? '等待信号' : local === 'deliver' ? '信号已传出' : local === 'receive' ? '正在接收' : local === 'activate' ? '已激活' : local === 'move' ? '前往目标' : '点击传信员开始传信'}</Text>
  </View>
}
