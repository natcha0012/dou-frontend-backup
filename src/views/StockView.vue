<template>
  <div
    class="absolute -top-1 flex items-end left-0 text-sm font-medium text-center text-white bg-[--vt-primary-blue] pb-5 w-full h-[70px]"
  >
    <ul class="flex flex-wrap w-full pl-3 pr-3">
      <li class="w-[50%] flex justify-center">
        <a href="#" class="inline-block w-full pb-4 border-b-2 border-gray-300">Stock</a>
      </li>
      <li class="w-[50%] flex justify-center">
        <a
          href="#"
          class="inline-blockpb-4 border-b-2 border-red-600 w-full rounded-t-lg active"
          aria-current="page"
          >Purchase Control</a
        >
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useFetch } from '@/composables/fetch'
onMounted(async () => {
  const { data, error } = await useFetch<any>('GET', '/stock?masterId=1')

  if (data.errorCode || error) {
    alert('unauthorized')
    return
  }
  console.log(data)
})
</script>
