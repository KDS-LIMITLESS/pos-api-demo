import { Collection } from 'mongodb'
import { client } from "./connection"
import { IItem } from './items'
import { RestaurantItems } from './restaurantItems';
import { IOrder } from './orders';



export const ItemsCollection: Collection<IItem> = client.db('pos').collection('items');
export const RestaurantItemsCollection: Collection<RestaurantItems> = client.db('pos').collection('restaurant_items');
export const OrdersCollection: Collection<IOrder> = client.db('pos').collection('orders');

