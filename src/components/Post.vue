<template>

<div class="max-w-md w-full py-4 px-8 bg-white shadow-lg rounded-lg mx-auto flex flex-col">
  <div class="flex-grow">
    <h2 class="text-gray-800 text-3xl font-semibold">{{ post.title }}</h2>
    <p class="mt-2 text-gray-600">{{ post.description }}</p>
  </div>
  <div class="flex justify-end mt-4 self-end">
    <router-link :to="`/post/${post.id}`" class="text-md font-medium text-indigo-500">Read more</router-link>
  </div>
</div>
<!--
  <div>
    <h4>{{ post.title }}</h4>
    <h5>{{ post.description }}</h5>
    <router-link :to="`/post/${post.id}`">Read more</router-link><br/>
    <a href="#" v-if="isLoggedIn">Edit Post</a><br/>
    <a href="#" v-if="isLoggedIn">Remove Post</a>
    <hr/>
  </div>-->
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