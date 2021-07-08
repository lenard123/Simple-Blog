<template>
  <div>
    <NavBar />

    <router-view></router-view>

  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import { useStore } from 'vuex'

export default {
  name: 'App',

  components: {
    NavBar
  },

  setup() {
    const store = useStore()
    store.dispatch('bindAuth')
    store.dispatch('bindPosts')
  }

}
</script>