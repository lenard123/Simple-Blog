<template>
  <nav  
    class="navbar bg-white"
    :class="{'shadow': !isOnTop}"
  >
    <div class="navbar-content-wrapper">

      <div class="pl-4">
        <router-link class="navbar-brand" to="/">
          Simple Blog
        </router-link>
      </div>

      <Toggler @toggleNavContent="visibleNavContent = !visibleNavContent"/>

      <NavLinks :visibleNavContent="visibleNavContent"/>

    </div>
  </nav>
</template>

<script>

import { onMounted, ref } from 'vue'
import Toggler from './Toggler.vue'
import NavLinks from './NavLinks.vue'

export default{

  components: { Toggler, NavLinks },

  setup() {

    const isOnTop = ref(true)
    const visibleNavContent = ref(false)

    onMounted(() => {
      document.addEventListener('scroll', function() {
        isOnTop.value = window.scrollY <= 10
      });
    })

    return { visibleNavContent, isOnTop }
  }
}
</script>