import { UserModel, IUser } from '../models/users';
import { LogError } from '../utils/errors';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import AppConstants from '../app-constants/custom';
import tokens from '../middlewares/tokens';
import { sendVerificationOTP, generateUniqueIDs } from '../utils/mail';



const _uM = new UserModel();

async function registerUser(user:IUser): Promise<any>{
  if (await _uM.isUserExist(user)) {
    throw new LogError(
      HttpStatusCodes.BAD_REQUEST, 
      AppConstants.USER_EXISTS);
  }
  await _uM.newUser(user);
  return user;
}

async function login(user:IUser) {
  const isUser = await _uM.isUserExist(user); 
  const isUserPWD = await _uM.compareUserPwd(user.password, user); 
  if (isUser && isUserPWD) {
    return tokens.generateToken(
      isUserPWD.username, 
      isUserPWD.role,
      isUserPWD.works_at,
      isUserPWD.status
    );
  } 
  throw new LogError(
    HttpStatusCodes.BAD_REQUEST,
    AppConstants.INVALID_LOGIN_DETAILS
  );
}

async function setUserStatus(status:IUser['status'], user:IUser) {
  return await _uM.updateUserStatus(status, user);
}
  

async function deletUser(user:IUser) {
  if (!(await _uM.isUserExist(user))) {
    throw new LogError(
      HttpStatusCodes.BAD_REQUEST,
      AppConstants.USER_NOT_FOUND
    );
  }
  return await _uM.deleteUser(user);
}

async function getUser(user:IUser) {
  return await _uM.isUserExist(user) ? await _uM.getUserProfile(user) : null;
}

async function updateUser(user:IUser) {
  if (await _uM.isUserExist(user)) {
    throw new LogError(
      HttpStatusCodes.BAD_REQUEST,
      AppConstants.USER_EXISTS
    );
  }
  return await _uM.updateUserProfile(user);
}

async function sendOTP(user:IUser) {
  const otp = await generateUniqueIDs(AppConstants.OTP_CHARS);
  console.log(otp);
  await _uM.setuserOTP(otp, user);
  const message = await sendVerificationOTP(user.email, otp, 'OTP VERIFICATION');
  if (message.Message === 'OK') return message;
  throw new LogError(
    HttpStatusCodes.INTERNAL_SERVER_ERROR, 
    AppConstants.SERVER_ERROR
  );
  
}
// HOW WILL THE FRONT END GET USER EMAIL
async function verifyUserOTP(user:IUser) {
  const getOTP = await _uM.getUserOTP(user);
  if (getOTP === user.user_otp ) {
    await setUserStatus('ACTIVE', user);
  } else {
    throw new LogError(
      HttpStatusCodes.BAD_REQUEST, AppConstants.BAD_OTP
    );
  }
}

// resend otp email
//  expire otp after 24hrs, 
// verify user before accessing some routes
// roll back changes if request does not complete
// deleting an owner account deletes the restaurant also

export default  {
  registerUser,
  login,
  setUserStatus,
  deletUser,
  getUser,
  updateUser,
  verifyUserOTP,
  sendOTP
} as const;