<template>
  <div class="flex flex-col w-full">
    <div class="flex font-bold">Stock At Our Branches</div>
    <div class="flex flex-row gap-2 mb-5">
      <div
        v-for="branch in branches"
        :key="branch.id"
        class="mt-3 gap-2 flex flex-col items-center"
      >
        <div
          class="flex justify-center overflow-hidden rounded-full h-20 w-20 border-white border-[6px] shadow-md"
        >
          <img class="object-cover" :src="branch.branchUrl" :alt="`branch${branch.id}`" />
        </div>
        <div class="text-sm">{{ branch.name }}</div>
      </div>
    </div>
    <div class="flex font-bold my-3 w-full">Best Sellers</div>
    <div
      class="relative w-full px-2 py-3 rounded-lg border text-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
    >
      <select class="w-full" v-model="selectedBranch">
        <option selected :value="0">สาขาทั้งหมด</option>
        <option v-for="item in branches" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="flex flex-row my-2 gap-2 w-full">
      <DatePicker
        style="width: calc(50% - 4px); font-size: 14px"
        title="From:"
        v-model="startDate"
      ></DatePicker>

      <DatePicker
        style="width: calc(50% - 4px); font-size: 14px"
        title="To:"
        v-model="endDate"
      ></DatePicker>
    </div>
    <DonutChart></DonutChart>
  </div>
</template>
<script setup lang="ts">
import { useFetch } from '@/composables/fetch'
import { UserRole } from '@/constant.ts/user.enum'
import { useAuthStore } from '@/stores/auth-store'
import type { BranchResp } from '@/types/branch'
import DatePicker from '../components/DatePicker.vue'
import { onMounted, ref } from 'vue'
import DonutChart from '../components/DonutChart.vue'

const branches = ref<(BranchResp & { branchUrl: string })[]>([])
const selectedBranch = ref(0)
const { user } = useAuthStore()
const startDate = ref('')
const endDate = ref('')

onMounted(async () => {
  await getBranches()
})

const getBranches = async () => {
  if (!user) {
    return
  }
  if (!user.branchMasterId && user.role !== UserRole.SUPER_ADMIN) {
    return
  }

  const url =
    user.role === UserRole.SUPER_ADMIN
      ? `/branchs`
      : `/branchs?branchMasterId=${user.branchMasterId}`
  const { data, error } = await useFetch<BranchResp[]>('GET', url)

  if (!data || data.errorCode || error) {
    alert('cannot get branches')
    return
  } else {
    branches.value = data.map((d) => {
      return {
        ...d,
        branchUrl: new URL(`../assets/branch-imgs/branch${d.id}.jpg`, import.meta.url).href
      }
    })
  }
}
</script>
