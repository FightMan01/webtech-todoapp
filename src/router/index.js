import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Register from '../views/Register.vue'
import Todos from '../views/Todos.vue'

const router = createRouter({
  history: createWebHistory('/webtech-todoapp/'),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
  ]
})

export default router
