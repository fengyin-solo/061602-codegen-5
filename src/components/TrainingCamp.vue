<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useGameState } from '@/composables/useGameState'
import { TRAINING_COURSES, TRAINING_MAX_LEVEL, TRAINING_EXP_PER_LEVEL, PERSONALITY_TRAINING_MULTIPLIER, PERSONALITY_NAMES, PERSONALITY_EMOJI } from '@/utils/constants'
import type { Bird, TrainingCourseType } from '@/types/game'
import BirdSprite from './BirdSprite.vue'

const props = defineProps<{
  bird: Bird | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const {
  state,
  startTraining,
  cancelTraining,
  canStartTraining,
  getBirdTrainingProgress,
  getBirdTrainingAwayReduction,
  getBirdTrainingEndingBonus,
} = useGameState()

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 100)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

const selectedBird = computed(() => props.bird)

const activeTraining = computed(() => selectedBird.value?.activeTraining)

const trainingProgress = computed(() => {
  if (!selectedBird.value) return 0
  if (!activeTraining.value?.isActive) return 0
  const { startTime, endTime } = activeTraining.value
  const total = endTime - startTime
  const elapsed = now.value - startTime
  return Math.min(100, (elapsed / total) * 100)
})

const trainingTimeLeft = computed(() => {
  if (!activeTraining.value?.isActive) return 0
  return Math.max(0, activeTraining.value.endTime - now.value)
})

const getProgressForCourse = (courseId: TrainingCourseType) => {
  if (!selectedBird.value) return null
  return getBirdTrainingProgress(selectedBird.value, courseId)
}

const getCourseSuitability = (courseId: TrainingCourseType) => {
  if (!selectedBird.value) return { multiplier: 1, label: '', color: '' }
  const multiplier = PERSONALITY_TRAINING_MULTIPLIER[selectedBird.value.personality]?.[courseId] ?? 1
  if (multiplier >= 1.3) {
    return { multiplier, label: '非常适合', color: 'text-green-400' }
  } else if (multiplier >= 1.1) {
    return { multiplier, label: '适合', color: 'text-green-300' }
  } else if (multiplier <= 0.7) {
    return { multiplier, label: '不太适合', color: 'text-red-400' }
  } else if (multiplier <= 0.9) {
    return { multiplier, label: '一般', color: 'text-yellow-400' }
  }
  return { multiplier, label: '普通', color: 'text-white/70' }
}

const getExpProgress = (progress: { totalExp: number; level: number } | null) => {
  if (!progress) return { current: 0, needed: TRAINING_EXP_PER_LEVEL, percent: 0 }
  const currentLevelExp = (progress.level - 1) * TRAINING_EXP_PER_LEVEL
  const current = progress.totalExp - currentLevelExp
  const needed = TRAINING_EXP_PER_LEVEL
  return { current, needed, percent: Math.min(100, (current / needed) * 100) }
}

const awayReduction = computed(() => {
  if (!selectedBird.value) return 0
  return Math.round(getBirdTrainingAwayReduction(selectedBird.value) * 100)
})

const endingBonus = computed(() => {
  if (!selectedBird.value) return 0
  return getBirdTrainingEndingBonus(selectedBird.value)
})

const handleStartTraining = (courseId: TrainingCourseType) => {
  if (!selectedBird.value) return
  startTraining(selectedBird.value.id, courseId)
}

const handleCancelTraining = () => {
  if (!selectedBird.value) return
  cancelTraining(selectedBird.value.id)
}

const canTrain = (courseId: TrainingCourseType) => {
  if (!selectedBird.value) return { canStart: false, reason: '请选择一只小鸟' }
  return canStartTraining(selectedBird.value.id, courseId)
}
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="font-display text-lg text-amber-300 flex items-center gap-2">
        <span>🎓</span> 性格训练营
      </div>
      <button
        class="w-8 h-8 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-all flex items-center justify-center"
        @click="emit('close')"
      >
        ✕
      </button>
    </div>

    <div v-if="!selectedBird" class="flex-1 flex items-center justify-center">
      <div class="text-center text-white/50">
        <div class="text-5xl mb-3">🐦</div>
        <div>请先选择一只小鸟</div>
        <div class="text-sm mt-1">幼鸟及以上阶段可参加训练</div>
      </div>
    </div>

    <div v-else class="flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
      <div class="glass rounded-2xl p-4 border border-white/10">
        <div class="flex items-center gap-4">
          <div class="relative">
            <BirdSprite
              :stage="selectedBird.stage"
              :is-dead="selectedBird.isDead"
              :is-away="selectedBird.isAway"
              :is-sick="selectedBird.isSick"
              :just-hatched="selectedBird.justHatched"
              :just-grew="selectedBird.justGrew"
              :just-fed="selectedBird.justFed"
              :just-trained="selectedBird.justTrained"
              :personality="selectedBird.personality"
            />
            <div
              v-if="activeTraining?.isActive"
              class="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs animate-pulse"
            >
              🎓
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-white text-lg">{{ selectedBird.name }}</div>
            <div class="text-sm text-amber-300 flex items-center gap-1">
              <span>{{ PERSONALITY_EMOJI?.[selectedBird.personality] }}</span>
              {{ PERSONALITY_NAMES[selectedBird.personality] }}
            </div>
            <div class="flex gap-4 mt-2 text-xs">
              <div class="bg-green-500/20 px-2 py-1 rounded-lg text-green-300">
                🛡️ 离巢率 -{{ awayReduction }}%
              </div>
              <div class="bg-amber-500/20 px-2 py-1 rounded-lg text-amber-300">
                ⭐ 结局 +{{ endingBonus }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTraining?.isActive" class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-white/80">
              正在进行：{{ TRAINING_COURSES.find(c => c.id === activeTraining.courseId)?.icon }}
              {{ TRAINING_COURSES.find(c => c.id === activeTraining.courseId)?.name }}
            </span>
            <span class="text-sm text-blue-300 font-mono">
              {{ Math.ceil(trainingTimeLeft / 1000) }}s
            </span>
          </div>
          <div class="h-2 bg-black/30 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-100"
              :style="{ width: `${trainingProgress}%` }"
            />
          </div>
          <button
            class="mt-3 w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-all"
            @click="handleCancelTraining"
          >
            ⏹️ 中断训练（退还50%食物）
          </button>
        </div>
      </div>

      <div class="text-sm text-white/60 px-1">
        选择训练课程（匹配性格获得更多加成）
      </div>

      <div class="space-y-3 pb-4">
        <div
          v-for="course in TRAINING_COURSES"
          :key="course.id"
          :class="[
            'rounded-2xl p-4 border transition-all',
            activeTraining?.courseId === course.id
              ? 'bg-blue-500/20 border-blue-400/50'
              : 'bg-white/5 border-white/10 hover:bg-white/10',
          ]"
        >
          <div class="flex items-start gap-3">
            <div class="text-3xl">{{ course.icon }}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-bold text-white">{{ course.name }}</span>
                <span :class="['text-xs px-2 py-0.5 rounded-full', getCourseSuitability(course.id).color]">
                  {{ getCourseSuitability(course.id).label }}
                </span>
              </div>
              <div class="text-xs text-white/50 mt-1">{{ course.description }}</div>

              <div class="flex flex-wrap gap-3 mt-2 text-xs">
                <span class="text-white/60">⏱️ {{ Math.round(course.duration / 1000) }}s</span>
                <span class="text-white/60">🍒 {{ course.cost }}</span>
                <span class="text-purple-300">😰 -{{ course.fearRecoveryBonus }}恐惧</span>
                <span class="text-green-300">🛡️ -{{ Math.round(course.awayChanceReduction * 100) }}%离巢</span>
                <span class="text-amber-300">⭐ +{{ course.endingBonus }}结局</span>
              </div>

              <div class="mt-3">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-white/60">
                    Lv.{{ getProgressForCourse(course.id)?.level ?? 0 }}/{{ TRAINING_MAX_LEVEL }}
                  </span>
                  <span class="text-white/40">
                    EXP: {{ getExpProgress(getProgressForCourse(course.id)).current }}/{{ getExpProgress(getProgressForCourse(course.id)).needed }}
                  </span>
                </div>
                <div class="h-1.5 bg-black/30 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all"
                    :style="{ width: `${getExpProgress(getProgressForCourse(course.id)).percent}%` }"
                  />
                </div>
              </div>

              <button
                v-if="!activeTraining?.isActive"
                :disabled="!canTrain(course.id).canStart"
                :class="[
                  'mt-3 w-full py-2 rounded-lg text-sm font-medium transition-all',
                  canTrain(course.id).canStart
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 active:scale-98'
                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed',
                ]"
                @click="handleStartTraining(course.id)"
              >
                {{ canTrain(course.id).canStart ? '🎓 开始训练' : canTrain(course.id).reason }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
