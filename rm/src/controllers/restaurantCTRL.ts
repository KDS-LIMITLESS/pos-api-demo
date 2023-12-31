import { IReq, IRes } from '../Types/express';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import { IRestaurant } from '../models/restaurants';
import RestaurantService from '../services/restaurantService';



export default class RestaurantControllers {

  public async createRestaurant(req: IReq, res: IRes) {

    const restaurantSrc : IRestaurant = req.body;
    if (instanceOfRestaurant(restaurantSrc)) {
      const restaurant = await RestaurantService.createRestaurant(restaurantSrc);
      res.status(HttpStatusCodes.OK).json(restaurant);
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
    }
  }


  public async getRestaurant (req: IReq, res: IRes) {

    const id : IRestaurant['restaurant_id'] = req.body.restaurant_id;
    if(typeof(id) !== 'string') {
      res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
    }
    const restaurant = await RestaurantService.getRestaurant(id);
    res.status(HttpStatusCodes.OK).json(restaurant);
  }


  public async updateRestaurant (req: IReq, res: IRes) {
    const updatedRestaurant = req.body;
    if (instanceOfRestaurant(updatedRestaurant) && 'restaurant_id' in updatedRestaurant) {
      const newRestaurant = await RestaurantService.updateRestaurant(
        updatedRestaurant
      );
      res.status(HttpStatusCodes.OK).json(newRestaurant);
    }
  }


  public async deleteRestaurant (req: IReq, res: IRes) {
    const id : IRestaurant['restaurant_id'] = req.body.restaurant_id;
    if(typeof(id) !== 'string') {
      res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
    }
    const success = await RestaurantService.deleteRestaurant(id);
    if (success) res.sendStatus(HttpStatusCodes.NO_CONTENT);
  }

  async addUser(req:IReq, res:IRes) {
    let { role, email, restaurant_id } = req.body
    await RestaurantService.sendRegisterationURL(email, restaurant_id, role )
    res.status(200).json({message: 'Registeration link has been sent to users email'});
  }
}

/**
* Check if incoming request is a type of IItem
* @param object object to check against the interface
* @returns boolean
*/

function instanceOfRestaurant(object: any): object is IRestaurant {
  return ( 
    'business_name' in object && 
    'business_address' in object && 
    'mode'  in object &&
    'parent_restaurant_id' in object
  );
}
// beware ts is not typesafe at runtime perfom some valiation

