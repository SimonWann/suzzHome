import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import suStorage from '../views/suStorage.vue'
import suConstruct from '../views/su-construct.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: suStorage
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: suConstruct
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href

export default router

