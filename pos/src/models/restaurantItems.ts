import { ItemsCollection, RestaurantItemsCollection } from "./collections";
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
  async addItemToRestaurant(restaurant_id: string, item: IItem, price: number): Promise<any> {
    let itemsData: IItem = {
      item_name: item.item_name!,
      item_category: item.item_category!,
      item_price: price
    }
    const newRestaurantItems: RestaurantItems = {
      _id:  restaurant_id,
      items: [itemsData]
    };
    return await RestaurantItemsCollection.findOneAndUpdate(
      {_id: restaurant_id},
      {$push: {'items':  newRestaurantItems.items[0]}},
      {upsert: true}
    )
  }

  /**
    gets an Item from the Items model
    @param: item_name
    @returns Item
  */
  async getItemFromItems(item_name: string): Promise<IItem> {
    const item: IItem | null = await ItemsCollection.findOne({
      item_name: item_name,
    });
    return item!;
  }

  /**
    import an Item
    @param: item_name, item_price, restaurantID
    @returns Item
  */
  async importItem(items: RestaurantItems['items'], restaurantID: string): Promise<any> {
    return await RestaurantItemsCollection.findOneAndUpdate(
      { _id: restaurantID },{ $set: { items } }, {returnDocument: "after"}
    );
  }

  /**
        get all items in a particular restaurant
        @param: restaurantID
        @returns Items Array
    */

  async getAllItems(restaurantID: string): Promise<RestaurantItems | null> {
    const restaurantItems: RestaurantItems | null =
      await RestaurantItemsCollection.findOne({ _id: restaurantID });

    if (!restaurantItems){
      return null;
    }
    return restaurantItems;
  }

  /**
        get an item in a particular restaurant
        @param: restaurantID, item_name
        @returns Item 
    */

  async getItemInRestaurant(restaurant_id: string, rItem: RestaurantItems): Promise<IItem | null> {
    try {
      const restaurantItems = await RestaurantItemsCollection.findOne({
        _id: restaurant_id,
      });
      const findItem = restaurantItems!.items.find((item) => {
        return item.item_name === rItem.item_name;
      });
      return findItem!;
    } catch(error) {
      return null
    }
  }

  /**
        update an item price in a particular restaurant
        @param: restaurantID, item_name, new_price
        @returns Item 
    */

  async updateItemPrice(restaurant: RestaurantItems): Promise<any> {
    const result = await RestaurantItemsCollection.findOneAndUpdate(
      {
        _id: restaurant._id,
        items: restaurant.items,
      },
      { $set: { "items.$.price": restaurant.items[0]['item_price'] } }, {returnDocument: "after"}
    );

    // const updatedItem: IItem | undefined = result.value?.items.find(
    //   (item) => item.item_name === restaurantItem.item_name
    // );

    return result;
  }

  /**
        delete an item in a particular restaurant
        @param: restaurantID, item_name
        @returns Boolean 
    */

  async deleteItem(restaurant: RestaurantItems): Promise<boolean> {
    const result = await RestaurantItemsCollection.findOneAndDelete({
      _id: restaurant._id,
      items: restaurant.items
    });
    if (result.ok === 1 && result.value) {
      return true;
    }
    return false;
  }
}
