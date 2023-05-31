import { ItemsModel } from "../models/items";
import {
  RestaurantItemsModel,
  RestaurantItems,
} from "../models/restaurantItems";
import { LogError } from "../utils/errors";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";

const _rIM = new RestaurantItemsModel();
const _iM = new ItemsModel();


async function importItem(restaurant_id: string, 
  item:RestaurantItems, price:number): Promise<RestaurantItems>
{
  let isItem = await _iM.findItem(item.item_name!)
  let isItemInRestaurant = await _rIM.getItemInRestaurant(
    restaurant_id, 
    item
  )
  if (isItem && !isItemInRestaurant) {
    return  await _rIM.addItemToRestaurant(restaurant_id, isItem, price);

  } else {
    throw new LogError(
      HttpStatusCodes.NOT_FOUND, 
      AppConstants.ITEM_ALREADY_EXISTS
    );
  }
}

async function getAllItems(
  restaurantID: string): Promise<RestaurantItems | null > 
{
  return await _rIM.getAllItems(restaurantID);
}

async function getItem(restaurant_id: string , 
  item: RestaurantItems): Promise<RestaurantItems| null> 
{
  return await _rIM.getItemInRestaurant(restaurant_id, item);
}

async function updateItemPrice(restaurant_id: string, 
  restaurantItem: RestaurantItems): Promise<RestaurantItems> 
{
  const item = await _rIM.updateItemPrice(restaurant_id, restaurantItem);
  if (!item) {
    throw new LogError(HttpStatusCodes.NOT_FOUND, AppConstants.DOES_NOT_EXIST);
  }
  return item;
}

async function deleteItem(restaurant_id: string, 
  restaurantItem: RestaurantItems): Promise<RestaurantItems> 
{
  const success = await _rIM.deleteItem(restaurant_id, restaurantItem);
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
