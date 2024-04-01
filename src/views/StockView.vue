<template>
  <div
    class="absolute -top-1 flex items-end left-0 text-sm font-medium text-center text-white bg-[--vt-primary-blue] pb-5 w-full h-[70px]"
  >
    <ul class="grid grid-flow-col-dense grid-cols-2 w-full pl-3 pr-3">
      <li @click="currentTab = 1">
        <a :class="currentTab === 1 ? activeTab : normalTab">Stock</a>
      </li>
      <li @click="currentTab = 2">
        <a :class="currentTab === 2 ? activeTab : normalTab">Purchase Control</a>
      </li>
    </ul>
  </div>
  <div class="mt-[70px] w-full h-full">
    <div v-if="currentTab === 1">
      <DailyStockReport></DailyStockReport>
    </div>
    <div v-else>
      <LimitStock></LimitStock>
    </div>
  </div>
</template>
<script setup lang="ts">
import DailyStockReport from '@/components/Stock/DailyStockReport.vue'
import LimitStock from '@/components/Stock/LimitStock.vue'
import { ref } from 'vue'
const currentTab = ref(1)
const activeTab = 'inline-block pb-4 border-b-2 border-red-600 w-full'
const normalTab = 'inline-block w-full pb-4 border-b-2 border-gray-300'
</script>
