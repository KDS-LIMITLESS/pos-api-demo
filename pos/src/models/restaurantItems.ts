import { ItemsCollection, RestaurantItemsCollection } from './collections'
import { InsertOneResult } from 'mongodb'
import { RestaurantItem } from './types'
import { IItem } from './items'
import { ItemsModel } from './items'


export interface RestaurantItems {
    _id: string,
    items: IItem[]
}

export class RestaurantItemsModel {
    /**
        import an Item
        @param: item_name, item_category, item_price
        @returns Item
    */
    async importItem(newItem: IItem, restaurantID:string): Promise<RestaurantItems> {
        // const item : IItem = (new ItemsModel).getItem(newItem.item_name);


        // if (!RestaurantItemsCollection.findOne({_id: restaurantID}, {item_name: newItem.item_name}) ) {
        const newRestaurantItems : RestaurantItems = {
            _id: restaurantID,
            items: [newItem]
        }     
        const insertResult: InsertOneResult<RestaurantItems> = await RestaurantItemsCollection.insertOne(newRestaurantItems);
        return newRestaurantItems
        

        // await RestaurantItemsCollection.updateOne({ _id: newItem.restaurantID }, { $push: { items : item } });

        // return (item);

    }

    /**
        get all items in a particular restaurant
        @param: restaurantID
        @returns Items Array
    */

    async getAllItems(restaurantID: string): Promise<RestaurantItem> {
        const restaurantItems: RestaurantItem | null = await RestaurantItemsCollection.findOne({ _id: restaurantID });
        // const items: RestaurantItem = restaurantItems!
        return (restaurantItems!);
    }

    /**
        get an item in a particular restaurant
        @param: restaurantID, item_name
        @returns Item 
    */

    async getItem(restaurantItem: RestaurantItem): Promise<RestaurantItems | null> {

        const item: RestaurantItems | null = await RestaurantItemsCollection.findOne(
            { _id: restaurantItem.restaurantID }, {item_name: restaurantItem.item_name}
        );
        return (item);
    }


    /**
        update an item price in a particular restaurant
        @param: restaurantID, item_name, new_price
        @returns Item 
    */

    async updateItemPrice(restaurantItem: RestaurantItem): Promise<IItem | null> {
            
            const restaurantItems: RestaurantItems | null = await RestaurantItemsCollection.findOne(
                { _id: restaurantItem.restaurantID }
            );
    
            const item: IItem | null = restaurantItems.items.find((item) => {
                return (item.item_name == restaurantItem.item_name);
            });
    
            item.item_price = restaurantItem.item_price;
    
            await RestaurantItemsCollection.updateOne(
                { _id: restaurantItem.restaurantID },
                { $set: { items: restaurantItems.items } }
            );
    
            return (item);
        }

    /**
        delete an item in a particular restaurant
        @param: restaurantID, item_name
        @returns Item 
    */

    async deleteItem(restaurantItem: RestaurantItem): Promise<IItem | null> {

        const restaurantItems: RestaurantItems | null = await RestaurantItemsCollection.findOne(
            { _id: restaurantItem.restaurantID }
        );

        const item: IItem | null = restaurantItems.items.find((item) => {
            return (item.item_name == restaurantItem.item_name);
        });

        const deletedItem = await RestaurantItemsCollection.updateOne(
            { _id: restaurantItem.restaurantID },
            { $pull: { items: { item_name: restaurantItem.item_name } } }
        );

        if (deletedItem != null)
            return (item);
        else
            return (null);
    }

}

