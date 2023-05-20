import { ItemsCollection, RestaurantItemsCollection } from "./collections";
import { RestaurantItem } from "./types";
import { IItem } from "./items";

export interface RestaurantItems {
  _id: string;
  items: IItem[];
}

export class RestaurantItemsModel {
  /**
        Create a new RestaurantItems 
        @param: restaurantID
        @returns RestaurantItems 
    */
  async createRestaurantItems(restaurantID: string): Promise<RestaurantItems> {
    const newRestaurantItems: RestaurantItems = {
      _id: restaurantID,
      items: [],
    };
    await RestaurantItemsCollection.insertOne(newRestaurantItems);
    return newRestaurantItems;
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
  async importItem(newItem: IItem, restaurantID: string): Promise<IItem> {
    await RestaurantItemsCollection.findOneAndUpdate(
      { _id: restaurantID },
      { $push: { items: newItem } }
    );
    return newItem;
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

  async getItem(restaurantItem: RestaurantItem): Promise<IItem | null> {
    const restaurantItems: RestaurantItems | null =
      await RestaurantItemsCollection.findOne({
        _id: restaurantItem.restaurantID,
      });

    if (!restaurantItems) {
      return null;
    }

    const item: IItem | undefined = restaurantItems.items.find((item) => {
      return item.item_name == restaurantItem.item_name;
    });
    return item!;
  }

  /**
        update an item price in a particular restaurant
        @param: restaurantID, item_name, new_price
        @returns Item 
    */

  async updateItemPrice(restaurantItem: RestaurantItem): Promise<IItem> {
    const result = await RestaurantItemsCollection.findOneAndUpdate(
      {
        _id: restaurantItem.restaurantID,
        "items.item_name": restaurantItem.item_name,
      },
      { $set: { "items.$.item_price": restaurantItem.item_price } }
    );

    const updatedItem: IItem | undefined = result.value?.items.find(
      (item) => item.item_name === restaurantItem.item_name
    );

    return updatedItem!;
  }

  /**
        delete an item in a particular restaurant
        @param: restaurantID, item_name
        @returns Boolean 
    */

  async deleteItem(restaurantItem: RestaurantItem): Promise<boolean> {
    const result = await RestaurantItemsCollection.findOneAndDelete({
      _id: restaurantItem.restaurantID,
      "items.item_name": restaurantItem.item_name,
    });
    if (result.ok === 1 && result.value) {
      return true;
    }
    return false;
  }
}
