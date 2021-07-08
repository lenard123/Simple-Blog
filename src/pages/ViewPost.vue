<template>
  <div>
    <h2>{{ post.title }}</h2>
    <h5>{{ post.description }}</h5>
    <p v-html="postContent"></p>
  </div>
</template>

<script>

import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'

import { NetworkError } from '@/error-handlers'

export default{
  setup() {
    const store = useStore()
    const route = useRoute()

    const id = route.params.id

    const post = reactive({})
    const postContent = computed(() => {
      if (post.content)
        return post.content.replace(/\n/g, '<br/>')
      return ''
    })

    store.dispatch('getPost', id)
      .then(_post => {
        Object.assign(post, _post)
      })
      .catch(NetworkError)

    return { post, postContent }
  }
}
</script>