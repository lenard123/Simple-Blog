<template>
  <nav>
    <router-link to="/">Simple Blog</router-link>
    <div>
      <ul v-if="user !== null">
        <li><router-link to="/create-post">New Post</router-link></li>
        <li><a href="#" @click="logout">Logout</a></li>
        <li>Logged in as: {{ user.displayName }}</li>
      </ul>
      <ul v-else>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>

import { computed } from 'vue'
import { useStore } from 'vuex'

export default{
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)

    const logout = () => store.dispatch('logout')

    return { user, logout }
  }
}
</script>