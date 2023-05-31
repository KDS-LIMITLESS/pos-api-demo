import { RestaurantItemsCollection } from "./collections";
// import { RestaurantItem } from "./types";
import { IItem } from "./items";


export interface RestaurantItems extends Partial<IItem>   {
  _id: string;
  items: IItem[];
}

export class RestaurantItemsModel {


  /**
    Create a new RestaurantItems 
    @param: restaurantID
    @returns RestaurantItems 
  */
  async addItemToRestaurant(restaurant_id: string, item: IItem, 
    item_price: number): Promise<any> 
  {
    let itemsData: IItem = {
      item_name: item.item_name!,
      item_category: item.item_category!,
      item_price: item_price
    }

    const newRestaurantItems: RestaurantItems = {
      _id:  restaurant_id,
      items: [itemsData]
    };

    const items = await RestaurantItemsCollection.findOneAndUpdate(
      {_id: restaurant_id},
      {$push: {'items':  newRestaurantItems.items[0]}},
      {upsert: true}
    )
    return items.value
  }

  /**
        get all items in a particular restaurant
        @param: restaurantID
        @returns Items Array
    */

  async getAllItems(restaurant_id: string): Promise<RestaurantItems | null> {
    const restaurantItems: RestaurantItems | null =
      await RestaurantItemsCollection.findOne({ _id: restaurant_id });
    return restaurantItems;
  }

  /**
    get an item in a particular restaurant
    @param: restaurantID, item_name
    @returns Item 
  */

  async getItemInRestaurant(restaurant_id: string, 
    rItem: RestaurantItems): Promise<RestaurantItems | null> 
  {
    console.log(rItem)
    return await RestaurantItemsCollection.findOne(
      {$and:[
        {_id: restaurant_id}, 
        {'items': {$elemMatch: {'item_name': rItem.item_name}}}
      ]},
      {projection: {'items': {$elemMatch: {'item_name': rItem.item_name}}}}
    );
  }

  /**
        update an item price in a particular restaurant
        @param: restaurant_id, item_name, item_price
        @returns boolean
    */

  async updateItemPrice(restaurant_id: string, 
    restaurant: RestaurantItems): Promise<RestaurantItems | null> 
  {
    const result = await RestaurantItemsCollection.findOneAndUpdate(
      {_id: restaurant_id, "items.item_name": restaurant.item_name},
      { $set: { 'items.$.item_price': restaurant.item_price}},
      {returnDocument: "after"}
    );
    return result.value;
  }

  /**
    delete an item in a particular restaurant
    @param: restaurantID, item_name
    @returns Boolean 
  */

  async deleteItem(restaurant_id: string, 
    restaurant: RestaurantItems): Promise<RestaurantItems | null> 
  {
    let arr: string[] = []
    arr.push(restaurant.item_name!)

    const result = await RestaurantItemsCollection.findOneAndUpdate(
      {_id: restaurant_id, "items.item_name": restaurant.item_name}, 
      {$pull: {"items": {'item_name': restaurant.item_name}}},
      {returnDocument: "after"}
    );
    return result.value;
  }
}
