import { UserModel, IUser } from '../models/users';
import DefaultAppConstants from '../app-constants/custom';


const _uM = new UserModel();

async function createUser(user:IUser): Promise<any>{
	if (await _uM.isUserExist(user.email) ) {
		console.log("User Already Exists. An Error is Expected ")
		return DefaultAppConstants.USER_EXISTS;
	};
	_uM.newUser(user);
	return user
}


export default  {
	createUser
} as const;