<template>
  <RemarkModal :visible="showModal" :modalData="modalData" @close="closeModal"></RemarkModal>
  <div v-for="(pdlist, i1) in orderDetail" :key="i1">
    <div class="py-4 text-center">{{ pdlist.productType }}</div>

    <div class="relative overflow-auto rounded-lg">
      <table class="w-full text-sm text-center">
        <thead class="text-xs">
          <tr class="px-4">
            <th
              v-for="header in headers"
              :key="header"
              scope="col"
              class="py-3 px-1"
              :class="{ 'pl-2': header === 'รายการ' }"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i2) in pdlist.products" :key="i2" class="bg-white border-b">
            <td>
              <div class="flex flex-row gap-2 h-full">
                <Tooltip v-model="remarkEachProduct[product.productId]">
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
              <input
                v-model="actualProduct[product.productId]"
                class="rounded-md w-[60px] text-center border p-2"
                type="number"
              />
            </td>
            <td>
              <div
                @click="
                  openModal(
                    product.productName,
                    product.productId,
                    remarkEachProduct[product.productId].masterRemark
                  )
                "
              >
                <img class="w-[20px] min-w-[20px]" src="../../assets/img-icons/edit.png" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="w-full flex justify-end">
    <button
      @click="onPacked()"
      class="rounded-lg font-medium border-2 p-2 mt-3 text-white bg-[--vt-success]"
    >
      Packed
    </button>
  </div>
</template>
<script setup lang="ts">
import type { ProductDetail, RemarkTooltip } from '@/types/order'
import { onMounted, ref, watch } from 'vue'
import { useFetch } from '@/composables/fetch'
import { useRouter } from 'vue-router'
import RemarkModal, { type OutputRemarkEvent } from './RemarkModal.vue'
import Tooltip from '@/components/TooltipRemark.vue'

type OrderTableDetail = { productType: string; products: ProductDetail[] }
type ModalData = {
  orderId: number
  productId: number
  productName: string
  remark?: string
}
interface IProps {
  orderId: number
  orderDetail: OrderTableDetail[]
}

const props = defineProps<IProps>()
const headers = ['รายการ', 'จำนวนที่สั่ง', 'จำนวนที่จัดส่ง', '']
const actualProduct = ref<Record<number, number>>({})
const remarkEachProduct = ref<Record<number, RemarkTooltip>>({})
const router = useRouter()
const showModal = ref(false)
const modalData = ref<ModalData>({
  orderId: 0,
  productId: 0,
  productName: '',
  remark: ''
})
onMounted(() => {
  if (props.orderDetail?.length) {
    defineActualProduct()
  }
})

const defineActualProduct = () => {
  props.orderDetail.forEach((type) => {
    type.products.forEach((p) => {
      actualProduct.value[p.productId] = p.orderedAmount
      remarkEachProduct.value[p.productId] = {}
    })
  })
}

const onPacked = async () => {
  const body: { productId: number; amount: number; masterRemark?: string }[] = []
  for (const [productId, amount] of Object.entries(actualProduct.value)) {
    body.push({
      productId: Number(productId),
      amount,
      masterRemark: remarkEachProduct.value[Number(productId)].masterRemark || undefined
    })
  }
  const { data, error } = await useFetch<string>('POST', `/order/packed/${props.orderId}`, {
    orders: body
  })
  if (!data || data.errorCode || error) {
    alert('cannot update order status')
    return
  }
  router.push('/orders')
}

const openModal = (productName: string, productId: number, remark?: string) => {
  modalData.value = {
    orderId: props.orderId,
    productId,
    productName,
    remark
  }
  showModal.value = true
}
const closeModal = (event: OutputRemarkEvent) => {
  if (event.isUpdate && event.data) {
    remarkEachProduct.value[event.data.productId] = { masterRemark: event.data.remark }
  }
  showModal.value = false
}

watch(
  props,
  () => {
    defineActualProduct()
  },
  { once: true }
)
</script>
