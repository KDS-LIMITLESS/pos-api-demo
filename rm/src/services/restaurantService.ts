import { 
    IRestaurant,
    IRestaurantOpt,
    RestaurantModel,
} from '../models/restaurants';
import { LogError } from '../utils/errors';
import HttpStatusCodes from '../../../app-constants/HttpStatusCodes';
import AppConstants from '../../../app-constants/custom';

const _rM = new RestaurantModel();

async function createRestaurant(restaurant: IRestaurant): 
Promise<IRestaurant>	{

    const createdRestaurant = await _rM.create(restaurant);

    if (createdRestaurant == null) {
        throw new LogError(
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
            AppConstants.CREATION_FAIL
        );
    }

    return (createdRestaurant);
}




async function getRestaurant (id: IRestaurant['restaurant_id']): 
Promise<IRestaurant>	{

    const restaurant : IRestaurant | null = await _rM.get(id);

    if (restaurant == null) {
        throw new LogError(
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
            AppConstants.DOES_NOT_EXIST
        );
    }

    return (restaurant);
}


async function updateRestaurant(newRestaurant: IRestaurantOpt):
Promise<IRestaurant> {

    if ((await _rM.get(newRestaurant.restaurant_id)) == null) {
        throw new LogError(
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
            AppConstants.DOES_NOT_EXIST
        );
    }

    const updatedRestaurant: IRestaurant = await _rM.update(newRestaurant);

    return (updatedRestaurant);

}


async function deleteRestaurant(id: IRestaurant['restaurant_id']): 
Promise<boolean> {
    const status = await _rM.delete(id);

    return (status);
}

export default  {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant
} as const;

