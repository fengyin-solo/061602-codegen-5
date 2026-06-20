<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GameState } from '@/types/game'
import { WEATHER_COLORS } from '@/utils/constants'

const props = defineProps<{
  state: GameState
  allAdults: boolean
}>()

const emit = defineEmits<{
  (e: 'release'): void
  (e: 'breed'): void
}>()

const lastLogCount = ref(0)
const showTip = ref(false)
const tipMessage = ref('')

watch(
  () => props.state.eventLog.length,
  (newLen) => {
    if (newLen > lastLogCount.value && props.state.eventLog[0]) {
      const last = props.state.eventLog[0]
      if (last.type === 'warning' || last.type === 'danger' || last.type === 'success') {
        tipMessage.value = last.message
        showTip.value = true
        setTimeout(() => { showTip.value = false }, 2500)
      }
    }
    lastLogCount.value = newLen
  },
  { immediate: true }
)
</script>

<template>
  <div class="relative w-full h-full flex flex-col gap-3 p-4">
    <div
      v-if="showTip"
      class="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-pop-in"
    >
      <div
        :class="[
          'px-5 py-2.5 rounded-2xl font-medium text-white shadow-2xl',
          state.eventLog[0]?.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
          state.eventLog[0]?.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
          state.eventLog[0]?.type === 'danger' ? 'bg-gradient-to-r from-red-500 to-rose-500' :
          'bg-gradient-to-r from-blue-500 to-indigo-500',
        ]"
      >
        {{ tipMessage }}
      </div>
    </div>

    <div v-if="allAdults" class="animate-pop-in">
      <div class="glass rounded-2xl p-5 card-shadow border border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
        <div class="text-center mb-4">
          <div class="text-3xl mb-2">🎉</div>
          <div class="font-display text-2xl text-yellow-300 text-stroke">全部长成成鸟啦！</div>
          <div class="text-sm text-white/70 mt-1">请选择它们的未来...</div>
        </div>
        <div class="flex gap-3 justify-center flex-wrap">
          <button
            class="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-bold
                   btn-3d hover:from-sky-400 hover:to-blue-500 flex items-center gap-2"
            @click="emit('release')"
          >
            <span class="text-xl">🕊️</span>
            放飞自由
          </button>
          <button
            v-if="state.breedingCount < state.maxBreedingRounds"
            class="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-bold
                   btn-3d hover:from-pink-400 hover:to-rose-500 flex items-center gap-2"
            @click="emit('breed')"
          >
            <span class="text-xl">💝</span>
            留下配对 ({{ state.breedingCount }}/{{ state.maxBreedingRounds }})
          </button>
          <button
            v-else
            class="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl font-bold
                   btn-3d hover:from-amber-400 hover:to-yellow-500 flex items-center gap-2"
            @click="emit('release')"
          >
            <span class="text-xl">🏡</span>
            留下陪伴（结束）
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 min-h-0 space-y-2 overflow-y-auto scrollbar-hide pr-1">
      <div v-for="log in state.eventLog.slice(0, 15)" :key="log.id" class="text-xs">
        <div
          :class="[
            'px-3 py-2 rounded-xl flex items-start gap-2',
            log.type === 'success' ? 'bg-green-500/15 text-green-200' :
            log.type === 'warning' ? 'bg-amber-500/15 text-amber-200' :
            log.type === 'danger' ? 'bg-red-500/15 text-red-200' :
            'bg-white/10 text-white/80',
          ]"
        >
          <span class="opacity-60 shrink-0 text-[10px] mt-0.5">
            {{ new Date(log.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) }}
          </span>
          <span>{{ log.message }}</span>
        </div>
      </div>
      <div v-if="state.eventLog.length === 0" class="text-center text-white/40 text-sm py-8">
        游戏日志将在这里显示~
      </div>
    </div>
  </div>
</template>
