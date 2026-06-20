<script setup lang="ts">
import type { Weather } from '@/types/game'
import { computed } from 'vue'

const props = defineProps<{
  weather: Weather
}>()

interface RainParticle {
  id: number
  left: number
  delay: number
  height: number
}

interface SnowParticle {
  id: number
  left: number
  delay: number
  size: number
}

const rainParticles = computed<RainParticle[]>(() => {
  if (props.weather === 'rainy') {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1,
      height: 15 + Math.random() * 20,
    }))
  }
  if (props.weather === 'stormy') {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      height: 20 + Math.random() * 30,
    }))
  }
  return []
})

const snowParticles = computed<SnowParticle[]>(() => {
  if (props.weather === 'snowy') {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: 8 + Math.random() * 12,
    }))
  }
  return []
})
</script>

<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div
      v-if="weather === 'sunny'"
      class="absolute inset-0 bg-gradient-to-b from-yellow-200/20 via-transparent to-transparent"
    >
      <div class="absolute top-4 right-8 text-6xl opacity-40 animate-float">☀️</div>
    </div>

    <div
      v-if="weather === 'rainy' || weather === 'stormy'"
      class="absolute inset-0"
    >
      <div
        v-for="p in rainParticles"
        :key="`r-${p.id}`"
        class="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-300/80 to-blue-400/60 rounded-full animate-rain"
        :class="weather === 'stormy' ? 'bg-gradient-to-b from-transparent via-gray-300/80 to-gray-500/60' : ''"
        :style="{
          left: `${p.left}%`,
          height: `${p.height}px`,
          animationDelay: `${p.delay}s`,
          animationDuration: weather === 'stormy' ? '0.5s' : '1s',
        }"
      />
    </div>

    <div
      v-if="weather === 'snowy'"
      class="absolute inset-0"
    >
      <div
        v-for="p in snowParticles"
        :key="`s-${p.id}`"
        class="absolute text-white rounded-full bg-white/90 shadow-sm animate-snow"
        :style="{
          left: `${p.left}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }"
      />
    </div>

    <div
      v-if="weather === 'stormy'"
      class="absolute inset-0 bg-purple-900/10"
    >
      <div class="absolute top-2 left-1/4 text-5xl opacity-60 animate-bounce-slow">⛈️</div>
    </div>
  </div>
</template>
