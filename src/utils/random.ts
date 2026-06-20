export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}

export const randomChoice = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
}

export const chance = (probability: number): boolean => {
  return Math.random() < probability
}

export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t
}

export const formatTime = (ms: number): string => {
  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}分${seconds}秒` : `${seconds}秒`
}
