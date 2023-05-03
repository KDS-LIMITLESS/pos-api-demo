import { IReq, IRes } from '../Types/express';
import HttpStatusCodes from '../../../app-constants/HttpStatusCodes';
import { IItem } from '../models/item';
import ItemService from '../services/item';


export default class RestaurantControllers {
    
        public async createItem(req: IReq, res: IRes) {
    
            const itemSrc : IItem = req.body;
    
            if (instanceOfItem(itemSrc)) {
    
                const item = await ItemService.createItem(
                    itemSrc
                );
    
                res.status(HttpStatusCodes.CREATED).json(item);
            }
    
        }

        public async getAllItems(req: IReq, res: IRes) {
                    
                const items = await ItemService.getAllItems();
        
                res.status(HttpStatusCodes.OK).json(items);
        }

        public async getItem(req: IReq, res: IRes) {
            const item_name = req.params.item_name;
            const item = await ItemService.getItem(item_name);
    
            res.status(HttpStatusCodes.OK).json(item);
        }
}

/**
* Check if incoming request is a type of IItem
* @param object object to check against the interface
* @returns boolean
*/
function instanceOfItem(object: any): object is IItem {
    return ('item_name' in object && 'item_price' in object);
}
// beware ts is not typesafe at runtime perfom some valiation
