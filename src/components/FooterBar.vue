<template>
  <footer
    class="h-[70px] w-full absolute bottom-0 bg-white p-2 text-base grid justify-items-center content-center grid-cols-5 gap-3"
  >
    <div class="flex justify-center items-center flex-col gap-1">
      <IconStock></IconStock>
      <span class="text-xs">Stock</span>
    </div>
    <div class="flex justify-center items-center flex-col gap-1">
      <IconProduction></IconProduction>
      <span class="text-xs">Production</span>
    </div>
    <div class="flex justify-center items-center flex-col gap-1">
      <IconBranch></IconBranch>
      <span class="text-xs">Branch</span>
    </div>
    <div class="flex justify-center items-center flex-col gap-1">
      <IconBagShop></IconBagShop>
      <span class="text-xs">Order</span>
    </div>
    <div class="flex justify-center items-center flex-col gap-1">
      <IconUser></IconUser>
      <span class="text-xs">Profile</span>
    </div>
  </footer>
</template>
<script setup lang="ts">
import IconStock from '../components/icons/IconStock.vue'
import IconProduction from '../components/icons/IconProduction.vue'
import IconBranch from '../components/icons/IconBranch.vue'
import IconBagShop from '../components/icons/IconBagShop.vue'
import IconUser from '../components/icons/IconUser.vue'
</script>
