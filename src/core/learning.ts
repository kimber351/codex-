import Taro from '@tarojs/taro'

export type ModuleId = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6'
export type UserMode = 'guest' | 'login'
export interface UserSession { mode: UserMode; phone?: string; loggedInAt?: string }
export interface LearningState {
  moduleId: ModuleId
  stageId: string
  completedModules: ModuleId[]
  completedStages: string[]
  selectedTarget?: string
  selectedCompound?: string
  isAnimating: boolean
  advancedOpen: boolean
  userMode: UserMode
  quiz?: Record<string, string>
}

const KEY = 'tongwei-learning-state'
const SESSION_KEY = 'tongwei-user-session'
const initial: LearningState = { moduleId: 'M1', stageId: 'intro', completedModules: [], completedStages: [], isAnimating: false, advancedOpen: false, userMode: 'guest' }

export const getLearningState = (): LearningState => {
  try { return { ...initial, ...(Taro.getStorageSync(KEY) || {}), userMode: getUserSession().mode } } catch { return initial }
}
export const saveLearningState = (patch: Partial<LearningState>): LearningState => {
  const state = { ...getLearningState(), ...patch }
  Taro.setStorageSync(KEY, state)
  return state
}
export const getUserSession = (): UserSession => {
  try { return Taro.getStorageSync(SESSION_KEY) || { mode: 'guest' } } catch { return { mode: 'guest' } }
}
export const setUserSession = (session: UserSession) => {
  Taro.setStorageSync(SESSION_KEY, session)
  saveLearningState({ userMode: session.mode })
  return session
}
export const isModuleUnlocked = (id: ModuleId, completed: ModuleId[]) => {
  if (id === 'M1') return true
  if (id === 'M2' || id === 'M3') return completed.includes('M1')
  if (id === 'M4') return completed.includes('M1') && completed.includes('M2') && completed.includes('M3')
  if (id === 'M5') return completed.includes('M4')
  if (id === 'M6') return completed.includes('M5')
  return false
}
