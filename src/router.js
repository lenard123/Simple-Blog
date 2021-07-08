import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import CreatePost from '@/pages/CreatePost.vue'
import ViewPost from '@/pages/ViewPost.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/create-post', component: CreatePost },
    { path: '/post/:id', component: ViewPost }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router