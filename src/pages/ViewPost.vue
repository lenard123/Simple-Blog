<template>
  <!--
  <div class="fixed top-0 bottom-0 left-0 right-0" v-if="fetchState === 'LOADING'">
    <div class="flex h-full w-full text-center flex-col justify-center">
      <i class="fa fa-spinner spin text-4xl"></i>
      <h2 class="text-lg">Fetching Post</h2>
    </div>
  </div>-->
  <Loading v-if="fetchState === 'LOADING'" />
  <div v-else-if="fetchState === 'LOADED'">

    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">

      <!--Title-->
      <div class="font-sans">
        <p class="text-base md:text-sm text-green-500 font-bold">&lt; <router-link to="/" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">BACK TO BLOG</router-link></p>
        <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{{ post.title }}</h1>
        <p class="text-sm md:text-base font-normal text-gray-600">Published 19 February 2019</p>
      </div>

      <p class="py-6">
        {{ post.description }}
      </p>

      <p class="py-6" v-html="parsePost(post.content)"></p>

    </div>

  </div>

</template>

<script>

import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'

import { NetworkError } from '@/error-handlers'
import Loading  from '@/components/Loading.vue'

export default{

  components: { Loading },

  setup() {
    const store = useStore()
    const route = useRoute()

    const id = route.params.id

    const post = reactive({})
    const fetchState = ref('LOADING')

    const parsePost = (content) => {
      return content.replaceAll('\n', '<br/>')
    }

    store.dispatch('getPost', id)
      .then(_post => {
        Object.assign(post, _post)
        document.title = post.title
        fetchState.value = 'LOADED'
      })
      .catch(NetworkError)

    return { post , parsePost, fetchState}
  }
}
</script>