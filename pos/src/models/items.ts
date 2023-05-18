import { ItemsCollection } from "./collections"
import { InsertOneResult } from 'mongodb'

export interface IItem {
    item_name: string,
    item_category: string,
    item_price?: number
}

export class ItemsModel {
    /**
        Creates an Item
        @param: item_name, item_category, item_price
        @returns Item
    */
    public async createItem(newItem : IItem): Promise<IItem | null> {
        const insertResult: InsertOneResult<IItem> = await ItemsCollection.insertOne(newItem);
        
        if (insertResult.acknowledged){
            return newItem;
        }
        else {
            return null;
        }
    }


    /**
        Gets all the items
        @param: none
        @returns Array of all items
    */
    public async getAllItems(): Promise<IItem[]> {
        const items: IItem[] = await ItemsCollection.find({}).toArray();
        return (items);
    }

    /**
        Get a specific Item
        @param: item_name
        @returns Item
    */

    public async getItem(item_name: IItem['item_name']): Promise<IItem | null> {
        const item: IItem | null = await ItemsCollection.findOne({ item_name });
        
        return (item);
    }


}
