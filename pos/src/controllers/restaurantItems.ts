import { IReq, IRes } from "../Types/express";
import { RestaurantItems } from "../models/restaurantItems";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";
import RestaurantItemsService from "../services/restaurantItems";


export default class RestaurantItemsControllers {


  public async importItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItems = req.body;

    if (await instanceOfRestaurantItem(itemSrc)) {
      try {
        const item = await RestaurantItemsService.importItem(
          req.body.restaurant_id, 
          itemSrc, 
          itemSrc.item_price!
        );
        res.status(HttpStatusCodes.CREATED).json(item);
      } catch(e: any) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({Error: e.message})
      }
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async getAllItems(req: IReq, res: IRes) {
    const restaurant_id: RestaurantItems['_id'] = req.body.restaurant_id;
    
    if (restaurant_id) {
      try {
        const items = await RestaurantItemsService.getAllItems(
          restaurant_id
        );
        res.status(HttpStatusCodes.OK).json(items);
      } catch(e: any) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({Error: e.message})
      }
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }


  public async getItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItems = req.body;

    if (await instanceOfRestaurantItem(itemSrc)) {
      try {
        const item = await RestaurantItemsService.getItem(
          req.body.restaurant_id,
          itemSrc
        );
        res.status(HttpStatusCodes.OK).json(item);
      } catch(e: any) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({Error: e.message})
      }
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async updateItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItems = req.body;

    if (await instanceOfRestaurantItem(itemSrc) && "item_price" in itemSrc) {
      try {
        const item = await RestaurantItemsService.updateItemPrice(
          req.body.restaurant_id,
          itemSrc
        );
  
        res.status(HttpStatusCodes.CREATED).json(item);
      } catch(e: any) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({Error: e.message})
      }
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async deleteItem(req: IReq, res: IRes) {
    const itemSrc: RestaurantItems = req.body;

    if (await instanceOfRestaurantItem(itemSrc)) {
      try {
        const item = await RestaurantItemsService.deleteItem(
          req.body.restaurant_id,
          itemSrc
        );
        res.status(HttpStatusCodes.OK).json(item);
      } catch(e: any) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({Error: e.message})
      }
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

async function instanceOfRestaurantItem(object: RestaurantItems): Promise<boolean> {
  return "restaurant_id" in object && typeof(object.restaurant_id) === 'string' &&
  "item_price" in object && typeof(object.item_price) === 'number' &&
  "item_name" in object && typeof(object.item_name) === 'string';
}
