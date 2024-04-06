<template>
  <nav
    v-if="props.title === 'Edit Profile'"
    class="text-white h-[70px] p-2 pl-6 text-base flex items-center"
  >
    <button class="flex flex-row items-center" @click="goBack()">
      <IconBack class="mr-2"></IconBack>
      {{ props.title }}
    </button>
  </nav>
  <nav v-else class="text-white h-[70px] p-2 text-base flex items-center justify-center">
    {{ props.title }}
  </nav>
</template>
<script setup lang="ts">
import IconBack from './icons/IconBack.vue'
import router from '@/router'
const props = defineProps<{
  title: string
}>()

const goBack = () => {
  router.go(-1)
}
</script>
