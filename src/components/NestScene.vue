<script setup lang="ts">
import { computed } from 'vue'
import type { Bird, Berry } from '@/types/game'
import BirdSprite from './BirdSprite.vue'
import BerryItem from './BerryItem.vue'
import { STAGE_NAMES } from '@/utils/constants'

const props = defineProps<{
  birds: Bird[]
  berries: Berry[]
  selectedBirdId?: string
}>()

const emit = defineEmits<{
  (e: 'selectBird', id: string): void
  (e: 'collectBerry', id: string): void
}>()

const displayBirds = computed(() => {
  return props.birds.map((bird, idx, arr) => {
    const total = arr.length
    const angle = (idx / Math.max(total, 1)) * Math.PI * 0.6 - Math.PI * 0.3
    const radius = total > 3 ? 70 : total > 2 ? 55 : 40
    const x = 50 + Math.sin(angle) * radius
    const y = 58 + Math.cos(angle) * 20 - (bird.stage === 'adult' ? 5 : 0)
    return { bird, x, y, idx }
  })
})
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <div class="absolute inset-0">
      <svg viewBox="0 0 400 300" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:#98FB98;stop-opacity:0.3" />
          </linearGradient>
          <radialGradient id="leafGrad" cx="50%" cy="50%">
            <stop offset="0%" style="stop-color:#228B22" />
            <stop offset="100%" style="stop-color:#006400" />
          </radialGradient>
        </defs>

        <rect width="400" height="300" fill="url(#skyGrad)" />

        <g opacity="0.8">
          <ellipse cx="50" cy="40" rx="60" ry="25" fill="#2d5a3d" />
          <ellipse cx="90" cy="30" rx="45" ry="20" fill="#3d7a4d" />
          <ellipse cx="350" cy="35" rx="70" ry="28" fill="#2d5a3d" />
          <ellipse cx="310" cy="25" rx="40" ry="18" fill="#3d7a4d" />
        </g>

        <g opacity="0.6">
          <ellipse cx="80" cy="260" rx="120" ry="50" fill="#1a472a" />
          <ellipse cx="320" cy="270" rx="140" ry="55" fill="#1a472a" />
          <ellipse cx="200" cy="280" rx="180" ry="40" fill="#1f4f32" />
        </g>

        <path d="M 0 100 Q 30 80 20 150 Q 10 220 40 200" stroke="#4a3520" stroke-width="8" fill="none" opacity="0.7" />
        <path d="M 400 110 Q 370 90 385 160 Q 395 230 365 210" stroke="#4a3520" stroke-width="8" fill="none" opacity="0.7" />

        <g opacity="0.9">
          <ellipse cx="30" cy="120" rx="30" ry="15" fill="url(#leafGrad)" transform="rotate(-30 30 120)" />
          <ellipse cx="15" cy="180" rx="28" ry="12" fill="url(#leafGrad)" transform="rotate(20 15 180)" />
          <ellipse cx="375" cy="130" rx="32" ry="16" fill="url(#leafGrad)" transform="rotate(30 375 130)" />
          <ellipse cx="390" cy="190" rx="26" ry="12" fill="url(#leafGrad)" transform="rotate(-25 390 190)" />
        </g>
      </svg>
    </div>

    <div class="relative w-[85%] max-w-lg aspect-[4/3] z-10">
      <div class="absolute inset-0 flex items-end justify-center">
        <svg viewBox="0 0 300 180" class="w-full h-full nest-shadow">
          <defs>
            <linearGradient id="nestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#A0522D" />
              <stop offset="50%" style="stop-color:#8B4513" />
              <stop offset="100%" style="stop-color:#5D3A1A" />
            </linearGradient>
            <pattern id="straw" patternUnits="userSpaceOnUse" width="20" height="8">
              <path d="M 0 4 Q 5 0 10 4 T 20 4" stroke="#C8976B" stroke-width="1.5" fill="none" opacity="0.4" />
            </pattern>
          </defs>

          <ellipse cx="150" cy="130" rx="135" ry="45" fill="url(#nestGrad)" />
          <ellipse cx="150" cy="125" rx="120" ry="35" fill="#6B4423" />
          <ellipse cx="150" cy="120" rx="130" ry="40" fill="url(#straw)" />

          <path d="M 20 120 Q 40 60 80 80 Q 120 95 150 90 Q 180 95 220 80 Q 260 60 280 120"
                stroke="#5D3A1A" stroke-width="3" fill="none" opacity="0.6" />

          <path d="M 40 110 Q 50 80 70 90" stroke="#8B6914" stroke-width="2" fill="none" />
          <path d="M 230 90 Q 250 80 260 110" stroke="#8B6914" stroke-width="2" fill="none" />
          <path d="M 100 85 L 105 70 L 115 82" stroke="#6B4423" stroke-width="2" fill="none" />
          <path d="M 185 82 L 195 70 L 200 85" stroke="#6B4423" stroke-width="2" fill="none" />
        </svg>
      </div>

      <div class="absolute inset-0">
        <div
          v-for="{ bird, x, y } in displayBirds"
          :key="bird.id"
          class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
          :class="selectedBirdId === bird.id && !bird.isDead ? 'scale-110 z-20' : 'z-10'"
          :style="{ left: `${x}%`, top: `${y}%` }"
          @click="emit('selectBird', bird.id)"
        >
          <BirdSprite
            :stage="bird.stage"
            :is-dead="bird.isDead"
            :is-away="bird.isAway"
            :is-sick="bird.isSick"
            :just-hatched="bird.justHatched"
            :just-grew="bird.justGrew"
            :just-fed="bird.justFed"
            :just-trained="bird.justTrained"
            :personality="bird.personality"
          />
          <div
            v-if="selectedBirdId === bird.id && !bird.isDead"
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap
                   px-2 py-0.5 bg-yellow-400/90 text-yellow-900 text-[10px] font-bold rounded-full"
          >
            {{ bird.name }} · {{ STAGE_NAMES[bird.stage] }}
          </div>
        </div>
      </div>

      <div
        v-for="berry in berries"
        :key="berry.id"
        class="absolute"
      >
        <BerryItem
          :type="berry.type"
          :value="berry.value"
          :x="berry.x"
          :y="berry.y"
          @collect="emit('collectBerry', berry.id)"
        />
      </div>
    </div>
  </div>
</template>
