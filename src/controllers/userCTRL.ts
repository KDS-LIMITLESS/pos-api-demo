import { IReq, IRes } from '../Types/express';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import { IUser} from '../models/users';
import UserService from '../services/UserService';

export default class UserControllers {

	async create (req:IReq, res: IRes) {
        const user:IUser = req.body
		await UserService.createUser(user);
		return res.status(HttpStatusCodes.OK).json({user});
	}
}

// beware ts is not typesafe at runtime perfom some valiation

