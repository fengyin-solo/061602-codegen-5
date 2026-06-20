<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '@/composables/useGameState'
import StatusBar from './StatusBar.vue'
import NestScene from './NestScene.vue'
import WeatherOverlay from './WeatherOverlay.vue'
import BirdCard from './BirdCard.vue'
import EventModal from './EventModal.vue'
import TrainingCamp from './TrainingCamp.vue'
import { WEATHER_COLORS } from '@/utils/constants'

const router = useRouter()
const {
  state, allAdults, aliveCount,
  collectBerry, feedBird, calmBird, buryBird,
  releaseBirds, keepAndBreed, returnToStart, tryLoadGame,
} = useGameState()

type RightPanelTab = 'events' | 'training'
const rightPanelTab = ref<RightPanelTab>('events')

const selectedBird = computed(() => {
  if (!state.selectedBirdId) return null
  return state.birds.find(b => b.id === state.selectedBirdId) ?? null
})

const handleOpenTraining = () => {
  rightPanelTab.value = 'training'
}

onMounted(() => {
  if (state.phase === 'start') {
    tryLoadGame()
    if (state.phase === 'start') {
      router.push('/')
    }
  }
})

watch(
  () => state.phase,
  (phase) => {
    if (phase === 'ended') {
      setTimeout(() => router.push('/end'), 1000)
    }
  }
)

const handleSelectBird = (id: string) => {
  state.selectedBirdId = state.selectedBirdId === id ? undefined : id
}

const handleCollect = (id: string) => {
  const val = collectBerry(id)
  if (val > 0) {
  }
}
</script>

<template>
  <div
    class="w-full h-full bg-gradient-to-br from-forest-dark via-forest to-forest-light relative overflow-hidden"
  >
    <div
      :class="['absolute inset-0 transition-colors duration-1000 bg-gradient-to-b', WEATHER_COLORS[state.currentWeather]]"
    />
    <WeatherOverlay :weather="state.currentWeather" />

    <div class="relative z-20 w-full h-full flex flex-col p-4 gap-4 max-w-[1400px] mx-auto">
      <StatusBar :state="state" />

      <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-3 order-2 lg:order-1 min-h-0 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          <div class="font-display text-lg text-amber-300 flex items-center gap-2 px-1">
            <span>🐦</span> 小鸟档案
          </div>
          <div class="flex flex-col gap-3 pb-4">
            <BirdCard
              v-for="bird in state.birds"
              :key="bird.id"
              :bird="bird"
              :selected="state.selectedBirdId === bird.id"
              :food-stock="state.foodStock"
              @select="handleSelectBird(bird.id)"
              @feed="((amt: number) => feedBird(bird.id, amt))"
              @calm="calmBird(bird.id)"
              @bury="buryBird(bird.id)"
              @open-training="handleOpenTraining"
            />
          </div>
        </div>

        <div class="lg:col-span-6 order-1 lg:order-2 relative rounded-3xl overflow-hidden bg-black/20 border border-white/10 backdrop-blur-sm min-h-[400px]">
          <NestScene
            :birds="state.birds"
            :berries="state.berries"
            :selected-bird-id="state.selectedBirdId"
            @select-bird="handleSelectBird"
            @collect-berry="handleCollect"
          />
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 glass rounded-xl px-4 py-2 text-xs text-white/80 flex items-center gap-2">
            <span class="animate-sparkle">✨</span>
            点击闪烁的浆果收集食物！
            <span class="animate-sparkle" style="animation-delay: 0.5s">✨</span>
          </div>
        </div>

        <div class="lg:col-span-3 order-3 min-h-0 flex flex-col rounded-2xl bg-black/20 border border-white/10 overflow-hidden">
          <div class="flex border-b border-white/10">
            <button
              :class="[
                'flex-1 py-3 text-sm font-medium transition-all',
                rightPanelTab === 'events'
                  ? 'text-amber-300 bg-white/10 border-b-2 border-amber-300'
                  : 'text-white/60 hover:text-white hover:bg-white/5',
              ]"
              @click="rightPanelTab = 'events'"
            >
              📜 事件日志
            </button>
            <button
              :class="[
                'flex-1 py-3 text-sm font-medium transition-all',
                rightPanelTab === 'training'
                  ? 'text-amber-300 bg-white/10 border-b-2 border-amber-300'
                  : 'text-white/60 hover:text-white hover:bg-white/5',
              ]"
              @click="rightPanelTab = 'training'"
            >
              🎓 训练营
            </button>
          </div>
          <div class="flex-1 min-h-0 overflow-hidden">
            <EventModal
              v-show="rightPanelTab === 'events'"
              :state="state"
              :all-adults="allAdults"
              @release="releaseBirds"
              @breed="keepAndBreed"
            />
            <div v-show="rightPanelTab === 'training'" class="h-full p-3 overflow-y-auto scrollbar-hide">
              <TrainingCamp
                :bird="selectedBird"
                @close="rightPanelTab = 'events'"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-3">
        <button
          class="px-4 py-2 glass rounded-xl text-white/80 text-sm hover:bg-white/20 transition-all flex items-center gap-1.5"
          @click="returnToStart(); router.push('/')"
        >
          <span>🏠</span> 返回主页
        </button>
        <div class="glass rounded-xl px-4 py-2 text-white/80 text-sm flex items-center gap-2">
          <span>💚</span> 存活 {{ aliveCount }} 只
          <span class="mx-1 text-white/30">|</span>
          孵化 {{ state.totalHatched }}
          <span class="mx-1 text-white/30">|</span>
          离世 {{ state.totalDied }}
        </div>
      </div>
    </div>
  </div>
</template>
