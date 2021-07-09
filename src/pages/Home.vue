<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-0">
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

    document.title = "My Personal Blog"

    return { posts }

  }
}
</script>