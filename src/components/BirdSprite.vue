<script setup lang="ts">
import { computed } from 'vue'
import type { GrowthStage, Personality } from '@/types/game'
import { PERSONALITY_EMOJI } from '@/utils/constants'

const props = defineProps<{
  stage: GrowthStage
  isDead?: boolean
  isAway?: boolean
  isSick?: boolean
  justHatched?: boolean
  justGrew?: boolean
  justFed?: boolean
  justTrained?: boolean
  personality?: Personality
}>()

const stageClass = computed(() => {
  if (props.isDead) return 'grayscale opacity-60'
  if (props.justHatched) return 'animate-hatch'
  if (props.justFed) return 'animate-happy'
  if (props.justTrained) return 'animate-happy'
  if (props.stage === 'egg') return 'animate-wiggle'
  if (props.isAway) return 'opacity-30 translate-x-full transition-all duration-500'
  return 'animate-breath'
})

const birdSize = computed(() => {
  switch (props.stage) {
    case 'egg': return 'text-4xl'
    case 'chick': return 'text-4xl'
    case 'juvenile': return 'text-5xl'
    case 'subadult': return 'text-5xl'
    case 'adult': return 'text-6xl'
    default: return 'text-4xl'
  }
})

const birdEmoji = computed(() => {
  if (props.isDead) return '💀'
  switch (props.stage) {
    case 'egg': return '🥚'
    case 'chick': return '🐣'
    case 'juvenile': return '🐥'
    case 'subadult': return '🦜'
    case 'adult': return '🐦'
    default: return '🥚'
  }
})
</script>

<template>
  <div class="relative flex flex-col items-center justify-center">
    <div
      v-if="justGrew"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div class="w-24 h-24 rounded-full bg-yellow-300/40 animate-ping" />
    </div>

    <div
      :class="[
        'relative transition-all duration-300 select-none',
        stageClass,
        birdSize,
      ]"
    >
      <span class="drop-shadow-lg">{{ birdEmoji }}</span>

      <span
        v-if="isSick && !isDead"
        class="absolute -top-2 -right-1 text-lg animate-bounce-slow"
      >🤒</span>
      <span
        v-else-if="isAway"
        class="absolute -top-2 -right-1 text-lg"
      >💨</span>
      <span
        v-else-if="personality && stage !== 'egg' && !isDead"
        class="absolute -top-3 -right-2 text-sm opacity-80"
      >{{ PERSONALITY_EMOJI[personality] }}</span>
    </div>

    <div
      v-if="isDead"
      class="mt-1 text-xs text-red-300 font-medium"
    >已离世</div>
    <div
      v-else-if="isAway"
      class="mt-1 text-xs text-blue-300 font-medium"
    >离巢中</div>
  </div>
</template>
