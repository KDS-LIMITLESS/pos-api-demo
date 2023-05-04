import { IItem } from "../models/items";
import { RestaurantItemsModel } from "../models/restaurantItems";
import { RestaurantItem } from "../models/types";
import { LogError } from "../utils/errors";
import HttpStatusCodes from "../../../app-constants/HttpStatusCodes";
import AppConstants from "../../../app-constants/custom";

const _rIM = new RestaurantItemsModel();

async function importItem(newItem: RestaurantItem): Promise<IItem> {
  const item: IItem = await _rIM.importItem(newItem);

  if (item == null) {
    throw new LogError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      AppConstants.CREATION_FAIL
    );
  }

  return item;
}

async function getAllItems(restaurantID: string): Promise<IItem[]> {
  const items: IItem[] = await _rIM.getAllItems(restaurantID);

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

async function deleteItem(restaurantItem: RestaurantItem) {
  const item: IItem | null = await _rIM.deleteItem(restaurantItem);

  if (item == null) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }

  return item;
}

export default {
  importItem,
  getAllItems,
  getItem,
  updateItemPrice,
  deleteItem,
} as const;
