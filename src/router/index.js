import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Chat from '../views/Chat.vue'
import Error from '../views/Error.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'Error',
    component: Error,
    meta: {
      requiresAuth: false
    } 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
