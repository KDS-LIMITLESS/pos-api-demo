import { IReq, IRes } from "../Types/express";
import { IItem } from "../models/items";
import { RestaurantItems } from "../models/restaurantItems";
import { RestaurantItem } from "../models/types";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";
import RestaurantItemsService from "../services/restaurantItems";

export default class RestaurantItemsControllers {
  public async importItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItem = req.body;

    if (instanceOfRestaurantItem(itemSrc)) {
      const item = await RestaurantItemsService.importItem(itemSrc);

      res.status(HttpStatusCodes.CREATED).json(item);
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async getAllItems(req: IReq, res: IRes) {
    const restaurantID: RestaurantItem["restaurantID"] = req.body.restaurantID;
    const items: RestaurantItems = await RestaurantItemsService.getAllItems(
      restaurantID
    );

    res.status(HttpStatusCodes.OK).json(items);
  }

  public async getItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItem = req.body;

    if (instanceOfRestaurantItem(itemSrc)) {
      const item: IItem = await RestaurantItemsService.getItem(itemSrc);

      res.status(HttpStatusCodes.OK).json(item);
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async updateItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItem = req.body;

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
    const itemSrc: RestaurantItem = req.body;

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

function instanceOfRestaurantItem(object: any): object is RestaurantItem {
  return "restaurantID" in object && "item_name" in object;
}
