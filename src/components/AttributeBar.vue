<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  max?: number
  label: string
  icon?: string
  type?: 'hunger' | 'health' | 'fear' | 'stage'
}>()

const max = computed(() => props.max ?? 100)
const percent = computed(() => Math.max(0, Math.min(100, (props.value / max.value) * 100)))

const barClass = computed(() => {
  if (props.type === 'fear') return 'progress-gradient-fear'
  if (props.type === 'stage') return 'bg-gradient-to-r from-amber-400 to-orange-500'
  if (percent.value >= 60) return 'progress-gradient-good'
  if (percent.value >= 30) return 'progress-gradient-mid'
  return 'progress-gradient-bad'
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-1 text-xs">
      <span class="text-white/90 font-medium flex items-center gap-1">
        <span v-if="icon">{{ icon }}</span>
        {{ label }}
      </span>
      <span class="text-white/70 font-mono">{{ Math.round(value) }}/{{ max }}</span>
    </div>
    <div class="h-3 bg-black/30 rounded-full overflow-hidden border border-white/10">
      <div
        :class="['h-full rounded-full transition-all duration-500 ease-out', barClass]"
        :style="{ width: `${percent}%` }"
      />
    </div>
  </div>
</template>
