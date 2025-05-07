import type { OrderStatus } from '@/constants/order.enum'

export type ListOrderResponse = {
  all: OrderResponse[]
  issue: OrderResponse[]
  action: OrderResponse[]
  waiting: OrderResponse[]
  success: OrderResponse[]
}

export type OrderResponse = {
  orderId: string
  date: string
  status: OrderStatus
  branchId: number
  branchName: string
}

export type GetOrderByIDResp = {
  id: string
  balance: string
  branchId: number
  branchMasterId: number
  branchName: string
  createdAt: string
  updatedAt: string
  deliverId: number
  packingId: number
  status: string
  orderDetail: { productType: string; products: ProductDetail[] }[]
  totalItems: number
}

export type ProductDetail = {
  productId: number
  productName: string
  orderedAmount: number
  actualAmount: number
  remark: RemarkTooltip
  pricePerOne: number
  balance: number
  confirm: boolean
}
export type RemarkTooltip = {
  masterRemark?: string
  branchRemark?: string
}
