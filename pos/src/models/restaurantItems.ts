import { ItemsCollection, RestaurantItemsCollection } from './collections'
import { InsertOneResult } from 'mongodb'
import { RestaurantItem } from './types'
import { IItem } from './items'


export interface RestaurantItems {
    _id: string,
    items: IItem[]
}

export class RestaurantItemsModel {

    /**
        Create a new RestaurantItems 
        @param: restaurantID
        @returns RestaurantItems 
    */ 
    async createRestaurantItems(restaurantID: string): Promise<RestaurantItems> {
        const newRestaurantItems : RestaurantItems = {
        _id: restaurantID,
        items: []
        }
        const insertResult: InsertOneResult<RestaurantItems> = await RestaurantItemsCollection.insertOne(newRestaurantItems);
        return newRestaurantItems;
    }

    /**
        gets an Item from the Items model
        @param: item_name
        @returns Item
    */

    async getItemFromItems(item_name: string): Promise<IItem> {
        const item: IItem | null = await ItemsCollection.findOne({ item_name: item_name });
        return (item!);
    }


    /**
        import an Item
        @param: item_name, item_price, restaurantID
        @returns Item
    */
    async importItem(newItem: IItem, restaurantID:string): Promise<IItem> {
        const restaurantItems: RestaurantItems | null = await RestaurantItemsCollection.findOne({ _id: restaurantID });
        restaurantItems!.items.push(newItem);
        await RestaurantItemsCollection.updateOne(
            { _id: restaurantID },
            { $set: { items: restaurantItems!.items } }
        );
        return (newItem!);
    }

    /**
        get all items in a particular restaurant
        @param: restaurantID
        @returns Items Array
    */

    async getAllItems(restaurantID: string): Promise<RestaurantItems> {
        const restaurantItems: RestaurantItems | null = await RestaurantItemsCollection.findOne({ _id: restaurantID });
        return (restaurantItems!);
    }

    /**
        get an item in a particular restaurant
        @param: restaurantID, item_name
        @returns Item 
    */

    async getItem(restaurantItem: RestaurantItem): Promise<IItem | null> {
        const restaurantItems: RestaurantItems | null = await RestaurantItemsCollection.findOne({ _id: restaurantItem.restaurantID });
        const item: IItem | undefined = restaurantItems!.items.find((item) => {
            return (item.item_name == restaurantItem.item_name);
        });
        return (item ? item : null);
    }


    /**
        update an item price in a particular restaurant
        @param: restaurantID, item_name, new_price
        @returns Item 
    */

    async updateItemPrice(restaurantItem: RestaurantItem): Promise<IItem> {
            
            const restaurantItems: RestaurantItems | null = await RestaurantItemsCollection.findOne(
                { _id: restaurantItem.restaurantID }
            )

            const item: IItem | undefined = restaurantItems!.items.find((item) => {
                return (item.item_name == restaurantItem.item_name);
            });
            if (item) {
                item.item_price = restaurantItem.item_price;
                await RestaurantItemsCollection.updateOne(
                    { _id: restaurantItem.restaurantID },
                    { $set: { items: restaurantItems!.items } }
                );
            }
            return (item!);
    }

    /**
        delete an item in a particular restaurant
        @param: restaurantID, item_name
        @returns Boolean 
    */

    async deleteItem(restaurantItem: RestaurantItem): Promise<Boolean> {
        const restaurantItems: RestaurantItems | null = await RestaurantItemsCollection.findOne({ _id: restaurantItem.restaurantID });
        const item: IItem | undefined = restaurantItems!.items.find((item) => {
            return (item.item_name == restaurantItem.item_name);
        });
        if (item) {
            restaurantItems!.items = restaurantItems!.items.filter((item) => {
                return (item.item_name != restaurantItem.item_name);
            });
            await RestaurantItemsCollection.updateOne(
                { _id: restaurantItem.restaurantID },
                { $set: { items: restaurantItems!.items } }
            );
            return (true);
        }
        return (false);
    }

}

