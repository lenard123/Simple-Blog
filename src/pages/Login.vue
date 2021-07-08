<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="submit">
      <div>
        <label>Email: </label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" v-model="password" />
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
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const submit = async () => {
      try {
        await store.dispatch('login', {
          email: email.value, 
          password: password.value
        })
        router.push('/')
      } catch (err) {
        console.log(err)
      }
      //store.commit('SET_USER', {name: 'Lenard Mangay-ayam'})
      //router.push('/')
    }

    return { email, password, submit }

  }
}

</script>