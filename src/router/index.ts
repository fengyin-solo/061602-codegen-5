import { createRouter, createWebHashHistory } from 'vue-router'
import StartScreen from '@/components/StartScreen.vue'
import GameScreen from '@/components/GameScreen.vue'
import EndScreen from '@/components/EndScreen.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'start', component: StartScreen },
    { path: '/game', name: 'game', component: GameScreen },
    { path: '/end', name: 'end', component: EndScreen },
  ],
})

export default router
