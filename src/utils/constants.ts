import type { Weather, WeatherEffect, BerryType, GrowthStage, Personality, TrainingCourse } from '@/types/game'

export const ATTR_MIN = 0
export const ATTR_MAX = 100
export const DEATH_THRESHOLD = 10

export const STAGE_DURATION: Record<Exclude<GrowthStage, 'adult'>, number> = {
  egg: 1,
  chick: 2,
  juvenile: 2,
  subadult: 1,
}

export const STAGE_NAMES: Record<GrowthStage, string> = {
  egg: '🥚 蛋',
  chick: '🐣 雏鸟',
  juvenile: '🐥 幼鸟',
  subadult: '🦜 亚成鸟',
  adult: '🐦 成鸟',
}

export const STAGE_EMOJI: Record<GrowthStage, string> = {
  egg: '🥚',
  chick: '🐣',
  juvenile: '🐥',
  subadult: '🦜',
  adult: '🐦',
}

export const FOOD_NEED_MULTIPLIER: Record<Exclude<GrowthStage, 'egg'>, number> = {
  chick: 1.5,
  juvenile: 1.2,
  subadult: 1.0,
  adult: 0.8,
}

export const HUNGER_DECAY_RATE = 1.5
export const FEAR_DECAY_RATE = 0.8
export const HEALTH_RECOVERY_RATE = 0.5

export const BERRY_SPAWN_INTERVAL = 4000
export const BERRY_MAX_COUNT = 8
export const BERRY_LIFETIME = 20000

export const BERRY_VALUES: Record<BerryType, number> = {
  red: 10,
  blue: 15,
  golden: 25,
}

export const BERRY_COLORS: Record<BerryType, string> = {
  red: '#C41E3A',
  blue: '#4169E1',
  golden: '#FFD700',
}

export const BERRY_EMOJI: Record<BerryType, string> = {
  red: '🍒',
  blue: '🫐',
  golden: '✨',
}

export const WEATHER_CHANGE_INTERVAL = 25000

export const WEATHER_EFFECTS: Record<Weather, WeatherEffect> = {
  sunny: { hungerMod: 1.0, fearMod: 0.8, healthMod: 1.0 },
  rainy: { hungerMod: 1.3, fearMod: 1.5, healthMod: 0.9, awayChance: 0.08 },
  snowy: { hungerMod: 1.5, fearMod: 1.2, healthMod: 0.7, sickChance: 0.12 },
  stormy: { hungerMod: 1.2, fearMod: 2.0, healthMod: 0.6, awayChance: 0.2, sickChance: 0.18 },
}

export const WEATHER_NAMES: Record<Weather, string> = {
  sunny: '☀️ 晴天',
  rainy: '🌧️ 雨天',
  snowy: '❄️ 雪天',
  stormy: '🌪️ 暴风',
}

export const WEATHER_COLORS: Record<Weather, string> = {
  sunny: 'from-amber-300/30 to-yellow-200/20',
  rainy: 'from-blue-400/40 to-gray-500/30',
  snowy: 'from-blue-100/40 to-white/30',
  stormy: 'from-gray-600/50 to-purple-800/40',
}

export const PERSONALITY_NAMES: Record<Personality, string> = {
  bold: '勇敢大胆',
  shy: '胆小害羞',
  gentle: '温柔恬静',
  curious: '好奇活泼',
  stubborn: '倔强独立',
}

export const PERSONALITY_EMOJI: Record<Personality, string> = {
  bold: '💪',
  shy: '🥺',
  gentle: '🌸',
  curious: '🌟',
  stubborn: '😤',
}

export const DAY_DURATION = 60000
export const INITIAL_FOOD = 30
export const MIN_EGGS = 2
export const MAX_EGGS = 4
export const MAX_BREEDING_ROUNDS = 2

export const BIRD_NAMES = [
  '毛毛', '豆豆', '啾啾', '喳喳', '花花', '点点', '果果', '泡泡',
  '糖糖', '圆圆', '小米', '小麦', '云朵', '星星', '月亮', '太阳',
  '小橘', '小蓝', '小绿', '小红', '阿黄', '阿白', '阿黑', '阿灰',
]

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'social',
    name: '社交礼仪课',
    icon: '🤝',
    description: '学习与同伴友好相处，提升社交能力',
    suitablePersonalities: ['gentle', 'curious'],
    unsuitablePersonalities: ['stubborn', 'shy'],
    duration: 15000,
    cost: 10,
    fearRecoveryBonus: 8,
    awayChanceReduction: 0.05,
    endingBonus: 3,
  },
  {
    id: 'courage',
    name: '勇气训练课',
    icon: '💪',
    description: '面对暴风雨不退缩，锻炼勇敢的心',
    suitablePersonalities: ['bold', 'curious'],
    unsuitablePersonalities: ['shy', 'gentle'],
    duration: 20000,
    cost: 15,
    fearRecoveryBonus: 15,
    awayChanceReduction: 0.12,
    endingBonus: 5,
  },
  {
    id: 'patience',
    name: '耐心修炼课',
    icon: '🧘',
    description: '学会等待和坚持，培养沉稳性格',
    suitablePersonalities: ['gentle', 'stubborn'],
    unsuitablePersonalities: ['curious', 'bold'],
    duration: 25000,
    cost: 12,
    fearRecoveryBonus: 10,
    awayChanceReduction: 0.08,
    endingBonus: 4,
  },
  {
    id: 'explore',
    name: '探索冒险课',
    icon: '🗺️',
    description: '探索未知世界，发现新奇事物',
    suitablePersonalities: ['curious', 'bold'],
    unsuitablePersonalities: ['shy', 'stubborn'],
    duration: 18000,
    cost: 18,
    fearRecoveryBonus: 12,
    awayChanceReduction: 0.1,
    endingBonus: 6,
  },
  {
    id: 'agility',
    name: '敏捷飞行课',
    icon: '⚡',
    description: '提高飞行技巧，增强应变能力',
    suitablePersonalities: ['bold', 'stubborn'],
    unsuitablePersonalities: ['gentle', 'shy'],
    duration: 22000,
    cost: 20,
    fearRecoveryBonus: 10,
    awayChanceReduction: 0.15,
    endingBonus: 7,
  },
]

export const TRAINING_EXP_PER_LEVEL = 100
export const TRAINING_MAX_LEVEL = 5
export const TRAINING_COOLDOWN = 5000

export const PERSONALITY_TRAINING_MULTIPLIER: Record<Personality, Record<string, number>> = {
  bold: { social: 0.8, courage: 1.5, patience: 0.7, explore: 1.3, agility: 1.4 },
  shy: { social: 0.6, courage: 0.5, patience: 1.2, explore: 0.6, agility: 0.7 },
  gentle: { social: 1.4, courage: 0.7, patience: 1.3, explore: 0.9, agility: 0.8 },
  curious: { social: 1.2, courage: 1.3, patience: 0.6, explore: 1.5, agility: 1.1 },
  stubborn: { social: 0.7, courage: 1.1, patience: 1.4, explore: 0.7, agility: 1.3 },
}
