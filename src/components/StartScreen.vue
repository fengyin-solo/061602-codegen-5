<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useGameState } from '@/composables/useGameState'

const router = useRouter()
const { startGame, tryLoadGame, state } = useGameState()

const hasSave = state.phase === 'playing' || state.phase === 'breeding'

onMounted(() => {
  tryLoadGame()
})

const handleStart = () => {
  startGame()
  router.push('/game')
}

const handleContinue = () => {
  router.push('/game')
}
</script>

<template>
  <div class="w-full h-full bg-gradient-to-br from-forest-dark via-forest to-forest-light flex items-center justify-center p-6 overflow-auto">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 text-6xl opacity-20 animate-float">🌳</div>
      <div class="absolute top-20 right-16 text-5xl opacity-20 animate-float" style="animation-delay: 0.5s">🌲</div>
      <div class="absolute bottom-20 left-20 text-4xl opacity-20 animate-float" style="animation-delay: 1s">🍃</div>
      <div class="absolute bottom-16 right-10 text-5xl opacity-20 animate-float" style="animation-delay: 1.5s">🌿</div>
      <div class="absolute top-1/3 left-1/4 text-3xl opacity-10 animate-bounce-slow">🐦</div>
      <div class="absolute top-1/2 right-1/3 text-3xl opacity-10 animate-bounce-slow" style="animation-delay: 0.7s">🐦</div>
    </div>

    <div class="relative z-10 max-w-2xl w-full">
      <div class="text-center mb-8 animate-pop-in">
        <div class="text-8xl mb-4 animate-bounce-slow inline-block">🪺</div>
        <h1 class="font-display text-6xl text-white text-stroke mb-3 tracking-wide">
          虚拟鸟巢
        </h1>
        <p class="text-forest-light/90 text-xl font-medium">超休闲·养成小游戏</p>
      </div>

      <div class="glass rounded-3xl p-8 card-shadow animate-pop-in" style="animation-delay: 0.15s">
        <h2 class="font-display text-2xl text-amber-300 mb-5 flex items-center gap-2">
          <span>📜</span> 游戏规则
        </h2>

        <div class="grid md:grid-cols-2 gap-4 mb-8">
          <div class="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div class="text-2xl mb-2">🥚</div>
            <div class="text-white font-bold mb-1">神奇孵化</div>
            <div class="text-white/60 text-sm">每窝 2~4 颗蛋，每颗独立孵化倒计时，孵化时长影响性格！</div>
          </div>

          <div class="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div class="text-2xl mb-2">🍒</div>
            <div class="text-white font-bold mb-1">采摘喂食</div>
            <div class="text-white/60 text-sm">点击鸟巢周围随机刷新的浆果收集食物，分配给需要的小鸟。</div>
          </div>

          <div class="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div class="text-2xl mb-2">🌤️</div>
            <div class="text-white font-bold mb-1">天气事件</div>
            <div class="text-white/60 text-sm">晴雨雪暴随机变化，影响属性！小心鸟儿离巢或生病~</div>
          </div>

          <div class="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div class="text-2xl mb-2">📈</div>
            <div class="text-white font-bold mb-1">五段成长</div>
            <div class="text-white/60 text-sm">🥚蛋 → 🐣雏鸟 → 🐥幼鸟 → 🦜亚成鸟 → 🐦成鸟</div>
          </div>

          <div class="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div class="text-2xl mb-2">💔</div>
            <div class="text-white font-bold mb-1">生离死别</div>
            <div class="text-white/60 text-sm">健康过低会死亡，埋葬鸟儿会影响同伴心理，需精心照料！</div>
          </div>

          <div class="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div class="text-2xl mb-2">🏆</div>
            <div class="text-white font-bold mb-1">多终结局</div>
            <div class="text-white/60 text-sm">成鸟后可放飞或留下配对繁殖，根据成活率等综合评分！</div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            v-if="hasSave"
            class="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl
                   font-bold text-lg btn-3d hover:from-amber-400 hover:to-orange-400 flex items-center justify-center gap-2"
            @click="handleContinue"
          >
            <span class="text-xl">📂</span>
            继续上次游戏
          </button>

          <button
            class="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl
                   font-bold text-lg btn-3d hover:from-green-400 hover:to-emerald-500 flex items-center justify-center gap-2"
            @click="handleStart"
          >
            <span class="text-xl">🪺</span>
            {{ hasSave ? '开启新的一窝' : '开始孵蛋！' }}
          </button>
        </div>

        <div class="mt-6 text-center text-white/40 text-xs">
          💡 小贴士：经常喂食、安抚恐惧、关注天气，健康成长的鸟儿才会获得高分！
        </div>
      </div>
    </div>
  </div>
</template>
