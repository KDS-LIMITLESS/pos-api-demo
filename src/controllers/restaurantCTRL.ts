import { IReq, IRes } from '../Types/express';
import HttpStatusCodes from '../app-constants/HttpStatusCodes';
import { IRestaurant, IRestaurantOpt } from '../models/restaurants';
import { pool as db } from '../models/connection';
import { RestaurantService } from '../services/restaurantService';


const restaurantService = new RestaurantService(db);

export default class RestaurantControllers {

	public async createRestaurant(req: IReq<IRestaurant>, res: IRes) {

		try {
			const restaurantSrc : IRestaurant = req.body;
			const restaurant = await restaurantService.createRestaurant(
				restaurantSrc
			);

			res.status(HttpStatusCodes.CREATED).json(restaurant);
		} catch (error) {
			console.error(error);
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(
				{message: 'Server error'}
			);
		}
	}


	public async getRestaurant (req:IReq<IRestaurant['email']>, res: IRes) {

		try {
			const email : IRestaurant['email'] = req.body;
			const restaurant = await restaurantService.getRestaurant(
				email
			);

			if (!restaurant) {
				res.status(HttpStatusCodes.NOT_FOUND).json(
					{message: 'Restaurant Not Found'}
				);
			} else {
				res.status(HttpStatusCodes.OK).json(restaurant);
			}
		} catch (error) {
			console.error(error);
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(
				{message: 'Server error'}
			);
		}

	}


	public async updateRestaurant (req:IReq<IRestaurantOpt>, res: IRes) {

		try {
			const updatedRestaurant = req.body;
			const newRestaurant = await restaurantService.updateRestaurant(
				updatedRestaurant
			);

			if (!newRestaurant) {
				res.status(HttpStatusCodes.NOT_FOUND).json(
					{message: 'Restaurant Not Found'}
				);
			} else {
				res.status(HttpStatusCodes.OK).json(newRestaurant);
			}
		} catch (error) {
			console.error(error);
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(
				{message: 'Server error'}
			);
		}

	}


	public async deleteRestaurant (req:IReq<IRestaurant['email']>, res: IRes) {

		try {
			const email : IRestaurant['email'] = req.body;
			const success = await restaurantService.deleteRestaurant(
				email
			);

			if (success) {
				res.sendStatus(HttpStatusCodes.NO_CONTENT);
			} else {
				res.status(HttpStatusCodes.NOT_FOUND).json(
					{message: 'Restaurant Not Found'}
				);
			}
		} catch (error) {
			console.error(error);
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(
				{message: 'Server error'}
			);
		}

	}
}

// beware ts is not typesafe at runtime perfom some valiation

