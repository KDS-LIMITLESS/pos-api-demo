import { IItem, ItemsModel } from "../models/items";
import {
  RestaurantItemsModel,
  RestaurantItems,
} from "../models/restaurantItems";
import { LogError } from "../utils/errors";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";

const _rIM = new RestaurantItemsModel();
const _iM = new ItemsModel();


async function importItem(restaurant_id: string, item:RestaurantItems, price:number): Promise<RestaurantItems> {
  let isItem = await _iM.findItem(item.item_name!)
  let isItemInRestaurant = await getItem(restaurant_id, item)

  if (isItem && !isItemInRestaurant) {
    return  await _rIM.addItemToRestaurant(restaurant_id, isItem, price);

  } else {
    throw new LogError(
      HttpStatusCodes.NOT_FOUND, 
      AppConstants.ITEM_ALREADY_EXISTS
    );
  }
}

async function getAllItems(restaurantID: string): Promise<RestaurantItems | null > {
  const items: RestaurantItems | null = await _rIM.getAllItems(restaurantID);

  return items;
}

async function getItem(restaurant_id: string , item: RestaurantItems): Promise<IItem | null> {
  const getItem = await _rIM.getItemInRestaurant(
    restaurant_id, 
    item
  );
  return getItem;
}

async function updateItemPrice(restaurantItem: RestaurantItems): Promise<IItem> {
  const item: IItem | null = await _rIM.updateItemPrice(restaurantItem);

  if (item == null) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }

  return item;
}

async function deleteItem(restaurantItem: RestaurantItems): Promise<Boolean> {
  const success: Boolean = await _rIM.deleteItem(restaurantItem);

  if (!success) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }

  return success;
}

export default {
  importItem,
  getAllItems,
  getItem,
  updateItemPrice,
  deleteItem,
} as const;
