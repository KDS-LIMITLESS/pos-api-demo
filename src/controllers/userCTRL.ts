import { IReq, IRes} from '../Types/express';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import { IUser} from '../models/users';

import UserService from '../services/UserService';


export default class UserControllers {

  async create (req:IReq<IUser>, res: IRes) {
    const user:IUser = req.body;
    console.log (user)
    if (instanceOfUser(user)){
      await UserService.createUser(user);
      res.status(HttpStatusCodes.OK).json({user});
    }
    res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED)
  }
}

/**
 * Check if incoming request is a type of IUser
 * @param object object to check against the interface
 * @returns boolean
 */
function instanceOfUser(object: any): object is IUser {
  return (
    'email' && 
    'full_name' && 
    'role' && 
    'password' && 
    'phone_number'  in object
  )
}
// beware ts is not typesafe at runtime perfom some valiation

