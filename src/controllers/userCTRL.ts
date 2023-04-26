import { IReq, IRes, UserLogin} from '../Types/express';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import { IUser} from '../models/users';

import UserService from '../services/UserService';


export default class UserControllers {

  async create (req:IReq, res: IRes) {
    const user:IUser = req.body;
    if (instanceOfUser(user)){
      await UserService.createUser(user);
		  return res.status(HttpStatusCodes.OK).json({user});
	  }
    res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED)
  }

  async login (req:IReq, res:IRes) {
    
    const user:UserLogin = req.body
    let userToken = await UserService.login(user)
    res.status(HttpStatusCodes.OK).json(userToken)
  }
}

/**
 * Check if incoming request is a type of IUser
 * @param object object payload to check against the interface
 * @returns boolean
 */
function instanceOfUser(object: any): object is IUser {
  return (
    'email' && 
    'username' && 
    'role' && 
    'password' in object
  )
}
