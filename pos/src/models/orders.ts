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

export class OrdersModel {
    /**
    Creates an Order 
    @param: restaurant_id, username, timestamp, order_items array
    @returns IOrder 
    */ 
    async createOrder(newOrder: IOrder): Promise<IOrder> {}


    /**
    Gets A restaurants Orders 
    @param: restaurant_id
    @returns IOrder array 
    */ 
    async getRestaurantOrders(restaurant_id: IOrder['restaurant_id']): 
    Promise<IOrder[] | null> {}


    /**
    Delete Order 
    @param: order_id
    @returns Boolean 
    */ 
    async deleteOrder(order_id: string): Promise<Boolean> {}

}
