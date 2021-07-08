<template>
  <div>
    <h2>Create new Post</h2>


    <form @submit.prevent="submit">
      <div>
        <label>Title:</label>
        <br/>
        <input type="text" required="" v-model="title" />
      </div>

      <div>
        <label>Short Description:</label>
        <br/>
        <textarea required="" v-model="description"></textarea>
      </div>

      <div>
        <label>Content: </label>
        <br/>
        <textarea required="" v-model="content"></textarea>
      </div>

      <div>
        <button>Submit</button>
      </div>

    </form>

  </div>
</template>


<script>

import { ref } from 'vue'
import { useStore } from 'vuex'

export default {

  setup() {

    const store = useStore()

    const title = ref('')
    const description = ref('')
    const content = ref('')

    const submit = async () => {
      await store.dispatch('createPost', {
        title: title.value, 
        description: description.value, 
        content: content.value
      })
      console.log('Added')
    }

    return { title, description, content, submit }

  }

}

</script>
