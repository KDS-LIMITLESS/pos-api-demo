import { IReq, IRes} from '../Types/express';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import { IUser} from '../models/users';

import UserService from '../services/UserService';


export default class UserControllers {

  async createUser (req:IReq, res: IRes) {
    const user:IUser = req.body;
    if (instanceOfUser(user)){
      await UserService.registerUser(user);
		  return res.status(HttpStatusCodes.OK).json({user});
	  }
    res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
  }

  async login (req:IReq, res:IRes) {
    const user:IUser = req.body;
    // console.log(req.body)
    const userToken = await UserService.login(user);
    res.status(HttpStatusCodes.OK).json(userToken);
  }

  async updateUserProfile(req: IReq, res: IRes) {
    let user:IUser = req.body;
    if (instanceOfUser(user)) {
      user = await UserService.updateUser(user);
      return res.status(HttpStatusCodes.OK).json({user});
    }
    res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
  }

  async getUserProfile(req: IReq, res: IRes) {
    const user:IUser = req.body;
    if (instanceOfUser(user)) {
      const userProfie = await UserService.getUser(user);
      return res.status(HttpStatusCodes.OK).json({userProfie});
    }
    res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
  }

  async suspendUserAccount(req:IReq, res: IRes) {
    const user:IUser = req.body;
    if (instanceOfUser(user)) {
      const userAccount= await UserService.setUserStatus('SUSPENDED', user);
      return res.status(HttpStatusCodes.OK).json({userAccount});
    }
    res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
  }

  async deleteUserAccount(req:IReq, res: IRes) {
    const user:IUser = req.body;
    if (instanceOfUser(user)) {
      await UserService.deletUser(user);
      return res.status(HttpStatusCodes.OK).json({message: 'User Deleted'});
    }
    res.status(HttpStatusCodes.BAD_REQUEST).json(AppConstants.BAD_INPUT_FILED);
  }

  async verifyOTP(req: IReq, res: IRes) {
    const user: IUser = req.body;
    await UserService.verifyUserOTP(user);
    res.status(HttpStatusCodes.OK).json({message:'OTP VERIFICATION SUCCESSFULL'});
  }

  async OTP(req:IReq, res:IRes) {
    const user:IUser = req.body;
    await UserService.sendOTP(user);
    res.status(200).json({message: 'OTP SENT TO USERS EMAIL'});
  }
}

/**
 * Check if incoming request is a type of IUser
 * @param object object payload to check against the interface
 * @returns boolean
 */
function instanceOfUser(object: any): object is IUser {
  return (
    'email' in object && 
    'username' in object && 
    'full_name' in object &&
    'phone_number' in object &&
    'role' in object && 
    'password' in object &&
    'works_at' in object
  );
}
