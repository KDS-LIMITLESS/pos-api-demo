import { 
  IRestaurant,
  IRestaurantOpt,
  RestaurantModel,
} from '../models/restaurants';
import { LogError } from '../utils/errors';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import mail from '../utils/mail';

const _rM = new RestaurantModel();


async function createRestaurant(restaurant: IRestaurant): 
Promise<IRestaurant>	{

  const createdRestaurant = await _rM.createRestaurant(restaurant);

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

  const restaurant : IRestaurant | null = await _rM.getRestaurant(id);

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

  // if ((await _rM.getRestaurant(newRestaurant.restaurant_id!)) == null) {
  //     throw new LogError(
  //         HttpStatusCodes.INTERNAL_SERVER_ERROR,
  //         AppConstants.DOES_NOT_EXIST
  //     );
  // }
  await getRestaurant(newRestaurant.restaurant_id!);
  const updatedRestaurant: IRestaurant = await _rM.updateRestaurant(newRestaurant);
  return (updatedRestaurant);
}

async function deleteRestaurant(id: IRestaurant['restaurant_id']): 
Promise<boolean> {
  const status = await _rM.deleteRestaurant(id);
  return (status);
}

async function sendRegisterationURL(email:string, rid: string, role: string) {
  const business_name = await _rM.getRestaurantName(rid)
  console.log(business_name)
  const message = await mail.sendUserRegistrationURL(email, rid, role, `${business_name}`);
  if (message.Message === 'OK') return message;
  throw new LogError(
    HttpStatusCodes.INTERNAL_SERVER_ERROR, 
    AppConstants.SERVER_ERROR
  );
}


export default  {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  sendRegisterationURL
} as const;

