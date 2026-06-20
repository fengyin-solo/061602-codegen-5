<script setup lang="ts">
import { computed } from 'vue'
import type { Bird } from '@/types/game'
import AttributeBar from './AttributeBar.vue'
import BirdSprite from './BirdSprite.vue'
import { STAGE_NAMES, PERSONALITY_NAMES, PERSONALITY_EMOJI } from '@/utils/constants'

const props = defineProps<{
  bird: Bird
  selected?: boolean
  foodStock: number
}>()

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'feed', amount: number): void
  (e: 'calm'): void
  (e: 'bury'): void
}>()

const canInteract = computed(() => {
  return !props.bird.isDead && !props.bird.isAway && props.bird.stage !== 'egg'
})

const feedAmounts = [5, 10, 20]

const hatchProgress = computed(() => {
  if (props.bird.stage !== 'egg') return 100
  const total = props.bird.hatchDuration
  const left = Math.max(0, props.bird.hatchTimeLeft)
  return ((total - left) / total) * 100
})
</script>

<template>
  <div
    :class="[
      'relative rounded-2xl p-4 transition-all duration-300 cursor-pointer',
      selected
        ? 'glass ring-2 ring-yellow-400/80 scale-[1.02] card-shadow'
        : 'bg-white/8 hover:bg-white/15 border border-white/10',
      bird.isDead ? 'opacity-70 bg-red-900/20' : '',
    ]"
    @click="emit('select')"
  >
    <div class="flex items-start gap-4">
      <div class="flex flex-col items-center gap-2 shrink-0">
        <BirdSprite
          :stage="bird.stage"
          :is-dead="bird.isDead"
          :is-away="bird.isAway"
          :is-sick="bird.isSick"
          :just-hatched="bird.justHatched"
          :just-grew="bird.justGrew"
          :just-fed="bird.justFed"
          :personality="bird.personality"
        />
        <div class="flex flex-col items-center">
          <div class="font-display text-lg text-white font-bold">{{ bird.name }}</div>
          <div class="text-xs text-white/70">{{ STAGE_NAMES[bird.stage] }}</div>
          <div v-if="bird.stage !== 'egg' && !bird.isDead" class="text-[10px] text-amber-300 mt-0.5">
            {{ PERSONALITY_EMOJI?.[bird.personality] }} {{ PERSONALITY_NAMES[bird.personality] }}
          </div>
        </div>
      </div>

      <div class="flex-1 min-w-0 space-y-2">
        <template v-if="bird.stage === 'egg'">
          <AttributeBar
            :value="hatchProgress"
            label="孵化进度"
            icon="🥚"
            type="stage"
          />
          <div class="text-xs text-white/60 text-center py-1">
            还剩 ~{{ Math.ceil(bird.hatchTimeLeft / 1000) }} 秒孵化
          </div>
        </template>

        <template v-else-if="!bird.isDead">
          <AttributeBar
            :value="bird.hunger"
            label="饱食度"
            icon="🍒"
            type="hunger"
          />
          <AttributeBar
            :value="bird.fear"
            label="恐惧值"
            icon="😰"
            type="fear"
          />
          <AttributeBar
            :value="bird.health"
            label="健康度"
            icon="❤️"
            type="health"
          />
        </template>

        <div v-if="bird.isDead" class="text-center py-4">
          <div class="text-red-300 font-medium mb-3">已告别这个世界...</div>
          <button
            class="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl
                   text-sm font-medium btn-3d hover:from-amber-500 hover:to-amber-600"
            @click.stop="emit('bury')"
          >
            🕊️ 埋葬告别
          </button>
        </div>

        <div v-else-if="canInteract" class="flex flex-wrap gap-2 pt-1" @click.stop>
          <div class="flex gap-1.5 items-center">
            <span class="text-xs text-white/60">喂食:</span>
            <button
              v-for="amt in feedAmounts"
              :key="amt"
              :disabled="foodStock < amt || !canInteract"
              :class="[
                'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
                foodStock >= amt && canInteract
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 active:scale-95'
                  : 'bg-gray-600/50 text-gray-400 cursor-not-allowed',
              ]"
              @click="emit('feed', amt)"
            >
              {{ amt }}🍒
            </button>
          </div>
          <button
            v-if="bird.fear > 20"
            class="px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-500 to-violet-500 text-white
                   hover:from-purple-400 hover:to-violet-400 active:scale-95 transition-all"
            @click="emit('calm')"
          >
            🤗 安抚
          </button>
        </div>

        <div v-if="bird.isAway && !bird.isDead" class="text-center text-blue-300 text-xs py-2">
          💨 暂时离巢中，天气好就回来~
        </div>
        <div v-if="bird.isSick && !bird.isDead" class="text-center text-orange-300 text-xs py-1">
          🤒 生病了，注意健康和保暖！
        </div>
      </div>
    </div>

    <div
      v-if="bird.stage !== 'egg' && !bird.isDead"
      class="absolute -bottom-1 left-4 right-4 h-1 bg-black/30 rounded-full overflow-hidden"
    >
      <div
        class="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 transition-all"
        :style="{ width: `${bird.stage === 'adult' ? 100 : bird.stageProgress * (bird.health / 100) * 100}%` }"
      />
    </div>
  </div>
</template>
