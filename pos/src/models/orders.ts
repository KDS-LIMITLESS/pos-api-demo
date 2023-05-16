import { OrdersCollection } from "./collections"
import { InsertOneResult } from 'mongodb'

export interface IOrderItem {
    item_name: string,
    quantity: number,
    price: number,
    amount: number
}

export interface IOrder {
    restaurant_id: string,
    username: string,
    timestamp: string,
    order_items: IOrderItem[]
}

