import { ModuleId } from '../core/learning'
export interface ModuleInfo { id: ModuleId; title: string; description: string; icon: string; prerequisite: string }
export const modules: ModuleInfo[] = [
  { id: 'M1', title: '认识信箱和天线', description: '介绍 GPCR、G 蛋白及离子通道。', icon: '⌂', prerequisite: '' },
  { id: 'M2', title: '中药成分匹配 GPCR', description: '体验活性成分与受体的作用关系。', icon: '✉', prerequisite: '完成 M1 后解锁' },
  { id: 'M3', title: '中药成分匹配离子通道', description: '了解离子通道及不同刺激的相关机制。', icon: '⌁', prerequisite: '完成 M1 后解锁' },
  { id: 'M4', title: 'GPCR 与离子通道相互调节', description: '探索两类膜蛋白系统之间的联系。', icon: '↔', prerequisite: '完成 M1、M2、M3 后解锁' },
  { id: 'M5', title: '荨麻疹痒信号接力', description: '认识外周感觉与脊髓相关信号机制。', icon: '◉', prerequisite: '完成 M4 后解锁' },
  { id: 'M6', title: '痒信号干预', description: '了解药物及相关研究干预机制。', icon: '✦', prerequisite: '完成 M5 后解锁' }
]
