<template>
  <div 
    class="navbar-content bg-white" 
    :class="{'hidden': !visibleNavContent}" 
  >

    <ul class="navbar-links">

      <li class="mr-3">
        <router-link class="navbar-links-item" to="/">Home</router-link>
      </li>

      <li class="mr-3" v-if="isLoggedIn">
        <router-link class="navbar-links-item" to="/create-post">New Post</router-link>
      </li>

      <li class="mr-3" v-if="isLoggedIn">
        <button class="navbar-links-item" @click="logout">Logout</button>
      </li>

      <li class="mr-3" v-if="!isLoggedIn">
        <router-link class="navbar-links-item" to="/login">Login</router-link>
      </li>

    </ul>        

  </div>
</template>

<script>

import { computed } from 'vue'
import { useStore } from 'vuex'


export default {
  props: ['visibleNavContent', 'isOnTop'],

  setup() {

    const store = useStore()
    const isLoggedIn = computed(() => !!store.state.user)

    const logout = () => {
      store.dispatch('logout')
    }

    return { isLoggedIn, logout }
  }
}

</script>