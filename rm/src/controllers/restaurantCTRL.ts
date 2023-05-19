import { IReq, IRes } from '../Types/express';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import { IRestaurant } from '../models/restaurants';
import RestaurantService from '../services/restaurantService';
import { NextFunction } from 'express';



export default class RestaurantControllers {

  public async createRestaurant(req: IReq, res: IRes, next: NextFunction) {

    const restaurantSrc : IRestaurant = req.body;
    if (instanceOfRestaurant(restaurantSrc)) {
      await RestaurantService.createRestaurant(restaurantSrc);
      next();
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
    }
  }


  public async getRestaurant (req: IReq, res: IRes) {

    const id : IRestaurant['restaurant_id'] = req.body.restaurant_id
    if(typeof(id) !== 'string') {
      res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
    }
    const restaurant = await RestaurantService.getRestaurant(id);
    res.status(HttpStatusCodes.OK).json(restaurant);
  }


  public async updateRestaurant (req: IReq, res: IRes) {

    const updatedRestaurant = req.body
    if (instanceOfRestaurant(updatedRestaurant)) {
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
}

/**
* Check if incoming request is a type of IItem
* @param object object to check against the interface
* @returns boolean
*/

function instanceOfRestaurant(object: any): object is IRestaurant {
<<<<<<< HEAD
  return ( 
    'business_name' in object && 
    'business_address' in object && 
    'mode'  in object &&
    'parent_restaurant_id' in object
  );
=======
  return (
    'restaurant_id' && 
    'business_name' && 
    'phone_number' && 
    'verification_status' && 
    'admin'  in object
  )
>>>>>>> 33355f31a6747e875f0343e515431585bb47a1c5
}
// beware ts is not typesafe at runtime perfom some valiation

