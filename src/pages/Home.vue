<template>
  <div>
    <h2>Home</h2>

    <Post v-for="post in posts" :post="post" :key="post.id"/>

  </div>
</template>


<script>

import { useStore } from 'vuex'
import { computed } from 'vue'
import Post from '@/components/Post'

export default {

  components: {
    Post
  },

  setup() {
    const store = useStore()

    const posts = computed(() => store.state.posts)

    return { posts }

  }
}
</script>