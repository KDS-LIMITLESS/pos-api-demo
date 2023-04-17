import { UserModel, IUser } from '../models/users';
import DefaultAppConstants from '../app-constants/custom';
import { LogError } from '../utils/errors';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';


const _uM = new UserModel();

async function createUser(user:IUser): Promise<any>{
  if (await _uM.isUserExist(user.email) ) {
    throw new LogError(
      HttpStatusCodes.BAD_REQUEST, 
      AppConstants.USER_EXISTS);
  }
  _uM.newUser(user);
  return user;
}


export default  {
  createUser
} as const;