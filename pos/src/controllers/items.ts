import { IReq, IRes } from "../Types/express";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";
import { IItem } from "../models/items";
import ItemService from "../services/items";

export default class RestaurantControllers {
  public async createItem(req: IReq, res: IRes) {
    const itemSrc: IItem = req.body;

    if (instanceOfItem(itemSrc)) {
      const item = await ItemService.createItem(itemSrc);

      res.status(HttpStatusCodes.CREATED).json(item);
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
    }
  }

  public async getAllItems(req: IReq, res: IRes) {
    const items: IItem[] = await ItemService.getAllItems();

    res.status(HttpStatusCodes.OK).json(items);
  }

  public async getItem(req: IReq, res: IRes) {
    const item_name: IItem["item_name"] = req.body.item_name;
    const item: IItem = await ItemService.getItem(item_name);

    res.status(HttpStatusCodes.OK).json(item);
  }
}

/**
 * Check if incoming request is a type of IItem
 * @param object object to check against the interface
 * @returns boolean
 */
export function instanceOfItem(object: any): object is IItem {
  return (
    "item_name" in object && "item_category" in object && "item_price" in object
  );
}
// beware ts is not typesafe at runtime perfom some valiation
