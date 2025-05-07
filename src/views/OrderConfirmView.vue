<template>
  <div class="bg-blue-300 top-0 z-10 sticky -mx-5 -my-3 px-6 py-4 shadow-md flex flex-col">
    <strong class="text-lg">Order ID: {{ orderId }}</strong>
    <div class="flex flex-row gap-2 my-2">
      <p class="text-xs">
        Order date: <strong>{{ order?.createdAt }}</strong>
      </p>
      <p class="text-xs">
        | Status: <strong>{{ OrderThaiStatus[order?.status as OrderStatus || OrderStatus.CANCELED] }}</strong>
      </p>
    </div>
  </div>
  <div class="min-h-[100vh] mt-5">
    <div class="text-lg font-bold text-end">Branch: {{ order?.branchName }}</div>
    <PackTable v-if="order?.status === OrderStatus.ORDER_PLACED" :orderId="Number(orderId) ?? 0"
      :orderDetail="order?.orderDetail ?? []"></PackTable>
    <ConfirmTable v-else :orderId="Number(orderId) ?? 0" :totalItems="order?.totalItems ?? 0"
      :orderDetail="order?.orderDetail ?? []"></ConfirmTable>
  </div>
</template>
<script setup lang="ts">
import { useFetch } from '@/composables/fetch'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { GetOrderByIDResp } from '@/types/order'
import { OrderStatus, OrderThaiStatus } from '@/constants/order.enum'
import PackTable from '@/components/Order/PackTable.vue'
import ConfirmTable from '@/components/Order/ConfirmTable.vue'

const route = useRoute()
const orderId = route.params.orderId
const order = ref<GetOrderByIDResp>()
onMounted(async () => {
  await getOrder()
})

const getOrder = async () => {
  if (!orderId) {
    alert('cannot get order id')
  }
  const { data, error } = await useFetch<GetOrderByIDResp>('GET', `/order/${orderId}`)

  if (!data || data.errorCode || error) {
    alert('cannot get order')
    return
  }
  order.value = data
}
</script>
