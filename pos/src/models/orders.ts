import { OrdersCollection } from "./collections"
import { InsertOneResult, DeleteResult } from 'mongodb'

export interface IOrderItem {
    item_name: string,
    quantity: number,
    price: number,
    amount: number
}

export interface IOrder {
    _id: string,
    restaurant_id: string,
    username: string,
    timestamp?: number,
    order_items: IOrderItem[]
}

export class OrdersModel {
    /**
    Creates an Order 
    @param: restaurant_id, username, order_items array
    @returns IOrder 
    */ 
    async createOrder(newOrder: IOrder): Promise<IOrder | null> {
        const result: InsertOneResult<IOrder> = await OrdersCollection.insertOne(newOrder);

        if (result.acknowledged){
            return newOrder;
        } else {
            return null;
        }
    }


    /**
    Gets A restaurants Orders 
    @param: restaurant_id
    @returns IOrder array 
    */ 
    async getRestaurantOrders(restaurant_id: IOrder['restaurant_id']): 
    Promise<IOrder[] | null> {
        const orders: IOrder[] = await OrdersCollection.find({
            restaurant_id: restaurant_id
        }).toArray();

        return (orders.length > 0 ? orders : null)
    }

    /**
    Gets an Order 
    @param: order_id
    @returns IOrder 
    */ 
    async getOrder(order_id: string): Promise<IOrder | null> {
        const order: IOrder | null = await OrdersCollection.findOne({
            _id: order_id
        });

        return (order ? order : null)

    }


    /**
    Delete Order 
    @param: order_id
    @returns Boolean 
    */ 
    async deleteOrder(order_id: string): Promise<Boolean> {
        const result: DeleteResult = await OrdersCollection.deleteOne({
            _id: order_id
        });

        return (result.deletedCount === 1 ? true : false)
    }



}
