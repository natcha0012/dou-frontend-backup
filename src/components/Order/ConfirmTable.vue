<template>
  <div v-for="(pdlist, i1) in data" :key="i1">
    <div class="py-4 text-center">{{ pdlist.productType }}</div>

    <div class="relative overflow-auto rounded-lg">
      <table class="w-full text-sm text-center">
        <thead class="text-xs">
          <tr class="px-4">
            <th v-for="header in headers" :key="header" scope="col" class="py-3 px-1"
              :class="{ 'pl-2': header === 'รายการ' }">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i2) in pdlist.products" :key="i2" class="bg-white border-b">
            <td>
              <div class="flex flex-row gap-2 h-full">
                <Tooltip v-model="product.remark">
                  <img class="ml-2 w-[20px]" src="../../assets/img-icons/circle-info-solid.svg" />
                </Tooltip>
                <div class="flex-grow text-left">
                  {{ product.productName }}
                </div>
              </div>
            </td>
            <td>
              {{ product.orderedAmount }}
            </td>
            <td>
              {{ product.actualAmount }}
            </td>
            <td>
              <button v-if="product.confirm" @click="unConfirm(i1, i2)"
                class="rounded-lg font-medium border-2 p-2 text-white bg-[--vt-success]">
                confirm
              </button>
              <button v-else @click="confirm(i1, i2)"
                class="rounded-lg font-medium border-2 p-2 text-[--vt-success] border-[--vt-success]">
                confirm
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <button class="rounded-xs h-[50px] w-[250px] rounded-full text-sm bg-[--vt-success] text-white"
      @click="onUpdateStatus()">
      <div class="flex justify-center align-middle">Confirm All</div>
    </button>
  </div>
</template>
<script setup lang="ts">
import type { ProductDetail } from '@/types/order'
import { ref, watch } from 'vue'
import { useFetch } from '@/composables/fetch'
import { useRouter } from 'vue-router'
import Tooltip from '@/components/TooltipRemark.vue'

type OrderTableDetail = { productType: string; products: ProductDetail[] }
interface IProps {
  orderId: number
  totalItems: number
  orderDetail: OrderTableDetail[]
}

const props = defineProps<IProps>()
const headers = ['รายการ', 'จำนวนที่สั่ง', 'จำนวนที่จัดส่ง', '']
const confirmCount = ref(0)


const router = useRouter()
const data = ref<OrderTableDetail[]>([])


const onUpdateStatus = async () => {
  const { data, error } = await useFetch<string>('POST', `/order/delivering/${props.orderId}`)
  if (!data || data.errorCode || error) {
    alert('cannot update order status')
    return
  }
  router.push('/orders')
}

const confirm = (i1: number, i2: number) => {
  confirmCount.value++
  data.value[i1].products[i2].confirm = true
  console.log(data.value)
  console.log(props.orderDetail)
}

const unConfirm = (i1: number, i2: number) => {
  confirmCount.value--
  data.value[i1].products[i2].confirm = false
}

watch(confirmCount, async (newV) => {
  if (newV === props.totalItems) {
    await onUpdateStatus()
  }
})

watch(() => props.orderDetail, (newVal) => {
  if (!newVal || newVal.length === 0) {
    return
  }
  data.value = newVal.map(order => ({
    productType: order.productType,
    products: order.products.map(product => ({
      ...product,
      confirm: false,
    })),
  }))
}, { once: true })
</script>
