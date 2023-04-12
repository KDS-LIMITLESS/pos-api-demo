import { UserModel, IUser } from '../models/users';


const _uM = new UserModel();

const USER_EXISTS = 'An account with email already exists';


async function createUser(user:IUser): Promise<any>{
	const findUser = await _uM.isUser(user.email);
	if (findUser) return USER_EXISTS; // write custom error handler class
	return _uM.newUser(user);
}



export default  {
	createUser
} as const;