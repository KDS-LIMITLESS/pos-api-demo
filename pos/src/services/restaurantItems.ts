import { IItem } from "../models/items";
import { RestaurantItemsModel, RestaurantItems } from "../models/restaurantItems";
import { RestaurantItem } from "../models/types";
import { LogError } from "../utils/errors";
import HttpStatusCodes from "../../../app-constants/HttpStatusCodes";
import AppConstants from "../../../app-constants/custom";

const _rIM = new RestaurantItemsModel();

async function importItem(newItem: RestaurantItem): Promise<IItem> {
  let restaurantItems: RestaurantItems | null = await _rIM.getAllItems(newItem.restaurantID);

  if (restaurantItems == null) {
    restaurantItems = await _rIM.createRestaurantItems(newItem.restaurantID)
    }

  const item: IItem = await _rIM.getItemFromItems(newItem.item_name);

  if (item == null) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }

  const importedItem = await _rIM.importItem(item, newItem.restaurantID);
  return (importedItem);

}

async function getAllItems(restaurantID: string): Promise<RestaurantItems> {
  const items: RestaurantItems = await _rIM.getAllItems(restaurantID);

  if (items == null) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }

  return items;
}

async function getItem(restaurantItem: RestaurantItem): Promise<IItem> {
  const item: IItem | null = await _rIM.getItem(restaurantItem);

  if (item == null) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }

  return item;
}

async function updateItemPrice(restaurantItem: RestaurantItem): Promise<IItem> {
  const item: IItem | null = await _rIM.updateItemPrice(restaurantItem);

  if (item == null) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }

  return item;
}

async function deleteItem(restaurantItem: RestaurantItem): Promise<Boolean> {
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
