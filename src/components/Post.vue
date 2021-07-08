<template>
  <div>
    <h4>{{ post.title }}</h4>
    <h5>{{ post.description }}</h5>
    <router-link :to="`/post/${post.id}`">Read more</router-link><br/>
    <a href="#" v-if="isLoggedIn">Edit Post</a><br/>
    <a href="#" v-if="isLoggedIn">Remove Post</a>
    <hr/>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { computed } from 'vue'

export default {

  props: ['post'],

  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const isLoggedIn = computed(() => !!user.value)

    return { isLoggedIn }
  }
}

</script>