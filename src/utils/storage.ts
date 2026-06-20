import type { GameState } from '@/types/game'

const STORAGE_KEY = 'virtual-bird-nest-save'

export const saveGame = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('保存游戏失败', e)
  }
}

export const loadGame = (): GameState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.warn('读取存档失败', e)
    return null
  }
}

export const clearSave = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('清除存档失败', e)
  }
}
