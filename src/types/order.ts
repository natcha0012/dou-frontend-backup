import type { OrderStatus } from '@/constant.ts/order.enum'

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
