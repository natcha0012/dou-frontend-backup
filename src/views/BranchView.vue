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
    <div class="w-full my-5 flex-col">
      <div class="w-full flex justify-center items-center">
        <DoughnutChart class="w-1/2 mb-10" :chartData="testData" :options="options" />
      </div>
      <div class="mx-5">
        <div v-for="(item, index) of data" :key="index" class="mb-3 flex flex-row">
          <div
            class="w-5 h-5 mr-5 rounded-md"
            :style="`background-color: ${item.backgroundColor}`"
          ></div>
          <div>{{ item.labels }}({{ item.percent }}%)</div>
          <div class="grow text-end">{{ item.amount }}</div>
        </div>
        <div class="m-5">
          <button
            class="w-full h-10 rounded-full border-2 hover:bg-[--vt-primary-blue] hover:text-white hover:shadow-md text-[--vt-primary-blue] border-[--vt-primary-blue] text-center"
          >
            show all
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFetch } from '@/composables/fetch'
import { UserRole } from '@/constant.ts/user.enum'
import { useAuthStore } from '@/stores/auth-store'
import type { BranchResp } from '@/types/branch'
import DatePicker from '../components/DatePicker.vue'
import { computed, onMounted, ref } from 'vue'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const branches = ref<(BranchResp & { branchUrl: string })[]>([])
const selectedBranch = ref(0)
const { user } = useAuthStore()
const startDate = ref('')
const endDate = ref('')

// const data = ref([30, 40, 60, 70, 5])
const data = ref([
  {
    amount: 30,
    labels: 'Paris',
    backgroundColor: '#77CEFF',
    percent: 40
  },
  {
    amount: 40,
    labels: 'Nîmes',
    backgroundColor: '#0079AF',
    percent: 40
  },
  {
    amount: 60,
    labels: 'Toulon',
    backgroundColor: '#123E6B',
    percent: 40
  },
  {
    amount: 70,
    labels: 'Perpignan',
    backgroundColor: '#97B0C4',
    percent: 40
  },
  {
    amount: 5,
    labels: 'Autre',
    backgroundColor: '#A5C8ED',
    percent: 40
  },
  {
    amount: 60,
    labels: 'Toulon2',
    backgroundColor: '#123E6B',
    percent: 40
  }
])
const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
})

const testData = computed(() => ({
  labels: data.value.map((d) => d.labels),
  datasets: [
    {
      data: data.value.map((d) => d.amount),
      backgroundColor: data.value.map((d) => d.backgroundColor)
    }
  ]
}))

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
