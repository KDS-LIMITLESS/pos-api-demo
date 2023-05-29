import { IReq, IRes } from "../Types/express";
import { RestaurantItems } from "../models/restaurantItems";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";
import RestaurantItemsService from "../services/restaurantItems";
import { IItem } from "../models/items";

export default class RestaurantItemsControllers {
  public async importItem(req: IReq, res: IRes) {
    // let restaurant_id = req.user.works_at
    const itemSrc: RestaurantItems = req.body;

    if (instanceOfRestaurantItem(itemSrc)) {
      const item = await RestaurantItemsService.importItem(
        req.body.restaurant_id, 
        itemSrc, 
        req.body.price
      );

      res.status(HttpStatusCodes.CREATED).json(item);
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async getAllItems(req: IReq, res: IRes) {
    const restaurantID: RestaurantItems['_id'] = req.body.restaurantID;
    
    if (restaurantID) {
      const items = await RestaurantItemsService.getAllItems(
        restaurantID
      );
  
      res.status(HttpStatusCodes.OK).json(items);
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }


  public async getItem(req: IReq, res: IRes) {
    const itemSrc: IItem[] = req.body;

    if (instanceOfRestaurantItem(itemSrc)) {
      const item = await RestaurantItemsService.getItem(
        req.body.restaurant_id,
        itemSrc
      );

      res.status(HttpStatusCodes.OK).json(item);
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async updateItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItems = req.body;

    if (instanceOfRestaurantItem(itemSrc) && "item_price" in itemSrc) {
      const item = await RestaurantItemsService.updateItemPrice(itemSrc);

      res.status(HttpStatusCodes.CREATED).json(item);
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async deleteItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItems = req.body;

    if (instanceOfRestaurantItem(itemSrc)) {
      const item = await RestaurantItemsService.deleteItem(itemSrc);

      res.status(HttpStatusCodes.CREATED).json(item);
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }
}

/**
 * Check if incoming request is a type of RestaurantItem
 * @param object object to check against the interface
 * @returns boolean
 */

function instanceOfRestaurantItem(object: any): object is RestaurantItems {
  return "restaurant_id" in object && "item_category" &&
    "price" && "item_name" in object;
}
