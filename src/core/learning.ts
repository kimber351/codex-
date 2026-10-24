import Taro from '@tarojs/taro'

export type ModuleId = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6'
export interface LearningState {
  moduleId: ModuleId
  stageId: string
  completedModules: ModuleId[]
  completedStages: string[]
  selectedTarget?: string
  selectedCompound?: string
  isAnimating: boolean
  advancedOpen: boolean
  quiz?: Record<string, string>
}

const KEY = 'tongwei-learning-state'
const initial: LearningState = { moduleId: 'M1', stageId: 'intro', completedModules: [], completedStages: [], isAnimating: false, advancedOpen: false }

export const getLearningState = (): LearningState => {
  try { return Taro.getStorageSync(KEY) || initial } catch { return initial }
}
export const saveLearningState = (patch: Partial<LearningState>): LearningState => {
  const state = { ...getLearningState(), ...patch }
  Taro.setStorageSync(KEY, state)
  return state
}
export const isModuleUnlocked = (id: ModuleId, completed: ModuleId[]) => {
  if (id === 'M1') return true
  if (id === 'M2' || id === 'M3') return completed.includes('M1')
  if (id === 'M4') return completed.includes('M1') && completed.includes('M2') && completed.includes('M3')
  if (id === 'M5') return completed.includes('M4')
  if (id === 'M6') return completed.includes('M5')
  return false
}
