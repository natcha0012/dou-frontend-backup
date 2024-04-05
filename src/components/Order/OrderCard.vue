<template>
  <div class="rounded-md shadow-sm bg-white px-3 py-1 flex flex-col gap-1">
    <div class="flex flex-row">
      <div class="text-gray-400">Branch: {{ branchName }}</div>
    </div>
    <div class="flex flex-row text-xs">
      <div>{{ date }}</div>
      <div class="grow text-end text-xs">
        status: <label :style="`color: ${color};`">{{ OrderThaiStatus[status] }}</label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { OrderThaiStatus, OrderStatus } from '@/constant.ts/order.enum'
defineProps<{ branchName: string; date: string; status: OrderStatus; color: string }>()
</script>
