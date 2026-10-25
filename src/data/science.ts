export interface GpcrInfo { id: string; name: string; label: string; ligand: string; color: string }
export const gpcrs: GpcrInfo[] = [
  { id: 'adrenergic', name: '肾上腺素受体', label: '应激信号接收器', ligand: '肾上腺素', color: '#2fae83' },
  { id: 'muscarinic', name: '毒蕈碱型乙酰胆碱受体', label: '胆碱能信号接收器', ligand: '乙酰胆碱', color: '#2e8fc2' },
  { id: 'dopamine-d1', name: '多巴胺 D1 受体', label: '动机信号接收器', ligand: '多巴胺', color: '#8266c6' },
  { id: 'histamine-h1', name: '组胺 H1 受体', label: '组胺信号接收器', ligand: '组胺', color: '#e27b63' },
  { id: 'grpr', name: 'GRPR', label: '痒觉信号接收器', ligand: '胃泌素释放肽', color: '#d4a33f' }
]
export interface ChannelInfo { id: string; name: string; label: string; color: string; detail: string }
export const channels: ChannelInfo[] = [
  { id: 'trpv1', name: 'TRPV1', label: '热/辣感应相关通道', color: '#f07e52', detail: '响应热和辣刺激的通道示意' },
  { id: 'trpa1', name: 'TRPA1', label: '化学刺激相关通道', color: '#dd5e63', detail: '响应化学刺激的通道示意' },
  { id: 'trpm8', name: 'TRPM8', label: '冷感相关通道', color: '#41b7c5', detail: '响应冷刺激的通道示意' },
  { id: 'kcnk', name: 'KCNK', label: '钾离子通道', color: '#866bb5', detail: '钾离子通道基础科普动画' },
  { id: 'trpv3', name: 'TRPV3', label: '温度敏感通道', color: '#4d8fc7', detail: '温度敏感通道基础科普动画' }
]
