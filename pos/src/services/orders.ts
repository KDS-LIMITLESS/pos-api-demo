import { IOrder, OrdersModel } from "../models/orders";
import { LogError } from "../utils/errors";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";
import { generateId } from "../utils/generate";


const _oM = new OrdersModel();


async function createOrder(newOrder: IOrder): Promise<IOrder> {
    newOrder._id = generateId(AppConstants.ID_CHARS, 8);
    newOrder.timestamp = Date.now();

    const order: IOrder | null = await _oM.createOrder(newOrder);
    
    if (order == null) {
        throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
    }
    
    return order;
}

async function getOrder(order_id: IOrder['_id']): Promise<IOrder> {
    const order: IOrder | null = await _oM.getOrder(order_id);
    
    if (order == null) {
        throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
    }
    
    return order;
}

async function getRestaurantOrders(restaurant_id: IOrder['restaurant_id']): Promise<IOrder[]> {
    const orders: IOrder[] | null = await _oM.getRestaurantOrders(restaurant_id);
    
    if (orders == null) {
        throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
    }
    
    return orders;
}


async function deleteOrder(order_id: IOrder['_id']): Promise<Boolean> {
    const success: Boolean = await _oM.deleteOrder(order_id);
    
    if (!success) {
        throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
    }
    
    return success;
}


export default {
    createOrder,
    getOrder,
    getRestaurantOrders,
    deleteOrder
} as const