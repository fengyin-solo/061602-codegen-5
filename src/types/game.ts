export type GrowthStage = 'egg' | 'chick' | 'juvenile' | 'subadult' | 'adult'

export type Weather = 'sunny' | 'rainy' | 'snowy' | 'stormy'

export type Personality = 'bold' | 'shy' | 'gentle' | 'curious' | 'stubborn'

export type BerryType = 'red' | 'blue' | 'golden'

export type GamePhase = 'start' | 'playing' | 'breeding' | 'ended'

export type TrainingCourseType = 'social' | 'courage' | 'patience' | 'explore' | 'agility'

export interface TrainingCourse {
  id: TrainingCourseType
  name: string
  icon: string
  description: string
  suitablePersonalities: Personality[]
  unsuitablePersonalities: Personality[]
  duration: number
  cost: number
  fearRecoveryBonus: number
  awayChanceReduction: number
  endingBonus: number
}

export interface TrainingProgress {
  courseId: TrainingCourseType
  level: number
  totalExp: number
  completedAt?: number
}

export interface TrainingSession {
  birdId: string
  courseId: TrainingCourseType
  startTime: number
  endTime: number
  isActive: boolean
}

export interface TrainingResult {
  courseId: TrainingCourseType
  success: boolean
  fearRecovered: number
  message: string
}

export interface Bird {
  id: string
  name: string
  stage: GrowthStage
  stageProgress: number
  hunger: number
  fear: number
  health: number
  personality: Personality
  hatchDuration: number
  hatchTimeLeft: number
  isAway: boolean
  isSick: boolean
  isDead: boolean
  feedingCount: number
  lastFedAt: number
  trainingProgress: TrainingProgress[]
  activeTraining?: TrainingSession
  awayUntil?: number
  sickUntil?: number
  justHatched?: boolean
  justGrew?: boolean
  justFed?: boolean
  justTrained?: boolean
}

export interface Berry {
  id: string
  x: number
  y: number
  value: number
  type: BerryType
  spawnedAt: number
}

export interface GameState {
  phase: GamePhase
  day: number
  dayProgress: number
  currentWeather: Weather
  nextWeatherChangeAt: number
  foodStock: number
  birds: Bird[]
  berries: Berry[]
  totalHatched: number
  totalDied: number
  breedingCount: number
  maxBreedingRounds: number
  eventLog: { id: string; message: string; type: string; timestamp: number }[]
  score?: GameScore
  selectedBirdId?: string
}

export interface GameScore {
  totalScore: number
  survivalRate: number
  avgHealth: number
  breedingBonus: number
  personalityBonus: number
  trainingBonus: number
  stars: number
  rank: string
}

export interface WeatherEffect {
  hungerMod: number
  fearMod: number
  healthMod: number
  awayChance?: number
  sickChance?: number
}
