import { useEffect, useRef, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import './science-components.scss'

export type MailboxStatus = 'idle' | 'selected' | 'receiving' | 'activated' | 'blocked' | 'resetting'
export interface MailboxProps { name: string; label: string; ligand: string; color?: string; status?: MailboxStatus; onActivated?: () => void; onStatusChange?: (status: MailboxStatus) => void }

export const Mailbox = ({ name, label, ligand, color = '#20a99d', status = 'idle', onActivated, onStatusChange }: MailboxProps) => {
  const [local, setLocal] = useState<MailboxStatus>(status)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => setLocal(status), [status])
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const update = (next: MailboxStatus) => { setLocal(next); onStatusChange?.(next) }
  const activate = () => {
    if (local === 'receiving' || local === 'activated') return
    if (timer.current) clearTimeout(timer.current)
    update('receiving')
    timer.current = setTimeout(() => { update('activated'); onActivated?.() }, 1150)
  }
  const block = () => { if (timer.current) clearTimeout(timer.current); update('blocked') }
  const reset = () => { if (timer.current) clearTimeout(timer.current); update('resetting'); timer.current = setTimeout(() => update('idle'), 350) }
  const active = local === 'activated'
  return <View className={`mailbox-card mailbox-${local}`} style={{ '--mailbox-color': color } as React.CSSProperties}>
    <View className="mailbox-illustration" aria-label={`${name}信箱`}>
      <View className="mailbox-antenna-dot" />
      <View className="mailbox-flag-pole"><View className="mailbox-flag" /></View>
      <View className="mailbox-shell"><View className="mailbox-opening" /><View className="mailbox-door" /><View className="mailbox-letter letter-a">✦</View><View className="mailbox-letter letter-b">•</View></View>
      <View className="mailbox-support" /><View className="mailbox-base" />
      {active && <View className="activation-ring">⌁</View>}
    </View>
    <Text className="component-name">{name}</Text><Text className="component-label">{label}</Text>
    <Text className="component-meta">配体示例：{ligand}</Text>
    <Text className="state-pill">{local === 'blocked' ? '已阻断' : local === 'activated' ? '已激活' : local === 'receiving' ? '信件投递中' : '待命'}</Text>
    <View className="component-actions"><Button size="mini" className="action-primary" onClick={activate}>投递信号</Button><Button size="mini" className="action-ghost" onClick={block}>阻断</Button><Button size="mini" className="action-ghost" onClick={reset}>复位</Button></View>
  </View>
}
