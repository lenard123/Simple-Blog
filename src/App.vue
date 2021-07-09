<template>

  <Loading v-if="!hasInitialized" />

  <NavBar v-if="hasInitialized"/>
  <div class="container w-full md:max-w-3xl mx-auto pt-20"  v-if="hasInitialized">
    <router-view></router-view>
  </div>

</template>

<script>

import NavBar from '@/components/NavBar'
import Loading from '@/components/Loading.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'App',

  components: {
    NavBar,
    Loading
  },

  setup() {
    const store = useStore()
    const hasInitialized = computed(() => store.state.hasInitialized)

    store.dispatch('bindAuth')
    store.dispatch('bindPosts')
    

    return { hasInitialized }

  }

}
</script>