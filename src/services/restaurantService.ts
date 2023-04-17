import { 
	IRestaurant,
	IRestaurantOpt,
	RestaurantModel
} from '../models/restaurants';
import { LogError } from '../utils/errors';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';

const _rM = new RestaurantModel();

async function createRestaurant(restaurant: IRestaurant): 
  Promise<IRestaurant>	{

}




async function getRestaurant (id: IRestaurant['restaurant_id']): 
Promise<IRestaurant | null>	{

}


async function updateRestaurant
	(restaurant: IRestaurantOpt): Promise<IRestaurant | null> {

}


async function deleteRestaurant(id: IRestaurant['restaurant_id']): 
Promise<boolean> {

}

export default  {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} as const;

