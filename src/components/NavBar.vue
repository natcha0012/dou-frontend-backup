<template>
  <nav class="text-white h-[70px] p-2 text-base flex items-center justify-center">
    {{ props.title }}
    <!-- <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink> -->
  </nav>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>
