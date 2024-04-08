<template>
  <div class="h-screen">
    <NavBar :title="title"></NavBar>
    <div
      v-if="title === 'Login'"
      class="flex items-center h-[calc(100vh-70px)] p-6 bg-[--vt-c-white-soft]"
    >
      <RouterView />
    </div>
    <div v-else-if="title === 'Profile' || title === 'Edit Profile'">
      <RouterView />
    </div>
    <div v-else>
      <div class="flex relative flex-col border-none px-6 pt-4 pb-[70px] bg-[--vt-c-white-soft]">
        <RouterView />
      </div>

      <FooterBar :focus="title"></FooterBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import { computed } from 'vue'

const route = useRouter()
const title = computed(() => {
  const routeName = route.currentRoute.value.name?.toString() ?? ''
  if (routeName.includes('Orders')) return 'Orders'
  return routeName
})
</script>
