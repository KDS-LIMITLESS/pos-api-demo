import { IItem, ItemsModel } from '../models/item';
import { LogError } from '../utils/errors';
import HttpStatusCodes from '../../../app-constants/HttpStatusCodes';
import AppConstants from '../../../app-constants/custom';


const _iM = new ItemsModel();

async function createItem(item: IItem): Promise<IItem> {
    
        const createdItem = await _iM.createItem(item);
    
        if (createdItem == null) {
            throw new LogError(
                HttpStatusCodes.INTERNAL_SERVER_ERROR,
                AppConstants.CREATION_FAIL
            );
        }
    
        return (createdItem);
}


async function getAllItems(): Promise<IItem[]> {
        
            const items: IItem[] = await _iM.getAllItems();
        
            return (items);
}

async function getItem(item_name : IItem['item_name']) {
    const item : IItem | null = await _iM.getItem(item_name);

    if (item == null) {
        throw new LogError(
            HttpStatusCodes.NOT_FOUND,
            AppConstants.DOES_NOT_EXIST
        );
    }

    return (item);
}

export default {
    createItem,
    getAllItems,
    getItem
} as const