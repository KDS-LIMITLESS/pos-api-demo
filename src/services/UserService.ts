import { UserModel, IUser } from '../models/users';
import { LogError } from '../utils/errors';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import tokens from '../middlewares/tokens';
import { UserLogin, UserSession } from '../Types/express';



const _uM = new UserModel();

async function createUser(user:IUser): Promise<any>{
  if (await _uM.isUserExist(user.email) ) {
    throw new LogError(
      HttpStatusCodes.BAD_REQUEST, 
      AppConstants.USER_EXISTS);
  }
  await _uM.newUser(user);
  return user;
}

async function login(user:UserLogin) {
  if (
    await _uM.isUserExist(user.email) && 
    await _uM.compareUserPwd(user.pwdHash) 
  ){
    //const _user = await tokens.generateToken(, user.role)
    //return _user
  }
  throw new LogError(
    HttpStatusCodes.BAD_REQUEST,
    AppConstants.INVALID_LOGIN_DETAILS
  )
}


export default  {
  createUser,
  login
} as const;