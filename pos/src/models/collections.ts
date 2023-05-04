import { Collection } from 'mongodb'
import { db } from "./connection"
import { IItem } from './items'
import { RestaurantItems } from './restaurantItems';



export const ItemsCollection: Collection<IItem> = db.collection('items');
export const RestaurantItemsCollection: Collection<RestaurantItems> = db.collection('restaurant_items');

