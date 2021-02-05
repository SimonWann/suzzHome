import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import suStorage from '../views/suStorage.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: suStorage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

