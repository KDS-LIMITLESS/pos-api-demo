import { IReq, IRes } from "../Types/express";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";
import { IOrder } from "../models/orders";
import OrdersService from "../services/orders";

export default class OrdersController {

    public async createOrder(req: IReq, res: IRes) {
        const orderSrc: IOrder = req.body;

        if (instanceOfOrder(orderSrc) && Array.isArray(orderSrc.order_items)) {
          const order = await OrdersService.createOrder(orderSrc);

          res.status(HttpStatusCodes.CREATED).json(order);
        } else {
          res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
        }
      }

    public async getOrder(req: IReq, res: IRes) {
        const order_id: IOrder["_id"] = req.body.order_id;

        if (order_id) {
            const order: IOrder = await OrdersService.getOrder(order_id);

            res.status(HttpStatusCodes.OK).json(order);      
        } else {
            res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
        }

      }


    public async getRestaurantOrders(req: IReq, res: IRes) {
        const restaurant_id: IOrder["restaurant_id"] = req.body.restaurant_id;

        if (restaurant_id) {
            const orders: IOrder[] = await OrdersService.getRestaurantOrders(restaurant_id);

            res.status(HttpStatusCodes.OK).json(orders);      
        } else {
            res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
        }

      }


    public async deleteOrder(req: IReq, res: IRes) {
        const order_id: IOrder["_id"] = req.body.order_id;

        if (order_id) {
            const success: Boolean = await OrdersService.deleteOrder(order_id);

            res.status(HttpStatusCodes.OK).json(success);      
        } else {
            res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
        }

      }
    }


/**
 * Check if incoming request is a type of IOrder
 * @param object object to check against the interface
 * @returns boolean
 */
export function instanceOfOrder(object: any): object is IOrder {
  return (
    "restaurant_id" in object && "username" in object && "order_items" in object
  );
}
// beware ts is not typesafe at runtime perfom some valiation
