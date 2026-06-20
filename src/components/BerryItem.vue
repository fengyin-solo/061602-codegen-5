<script setup lang="ts">
import { computed } from 'vue'
import type { BerryType } from '@/types/game'
import { BERRY_COLORS, BERRY_EMOJI, BERRY_VALUES } from '@/utils/constants'

const props = defineProps<{
  type: BerryType
  value: number
  x: number
  y: number
}>()

const emit = defineEmits<{
  (e: 'collect'): void
}>()

const bgStyle = computed(() => ({
  left: `${props.x}%`,
  top: `${props.y}%`,
  '--berry-color': BERRY_COLORS[props.type],
}))

const glowColor = computed(() => {
  if (props.type === 'golden') return 'shadow-yellow-400/60 animate-pulse-glow'
  if (props.type === 'blue') return 'shadow-blue-400/50'
  return 'shadow-red-400/50'
})
</script>

<template>
  <button
    class="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center
           text-2xl cursor-pointer animate-pop-in hover:scale-125 active:scale-95 transition-transform
           berry-shadow bg-white/90 border-2 border-white/50 z-10 shadow-lg"
    :class="glowColor"
    :style="bgStyle"
    @click.stop="emit('collect')"
  >
    <span class="drop-shadow">{{ BERRY_EMOJI[type] }}</span>
    <span
      class="absolute -bottom-4 text-[10px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded-full"
      :class="type === 'golden' ? 'bg-yellow-400 text-yellow-900' : type === 'blue' ? 'bg-blue-400 text-white' : 'bg-red-400 text-white'"
    >
      +{{ BERRY_VALUES[type] }}
    </span>
  </button>
</template>
