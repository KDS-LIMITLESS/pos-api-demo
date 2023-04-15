import { Pool } from 'pg';
import { 
	IRestaurant,
	IRestaurantOpt,
	RestaurantModel
} from '../models/restaurants';


export class RestaurantService {

	public constructor(private pool: Pool) {}

	public async createRestaurant
	(restaurant: IRestaurant): Promise<IRestaurant>
	{
		const client = await this.pool.connect();

		try {
			const restaurantModel = new RestaurantModel(client);
			return (await restaurantModel.create(restaurant));
		} finally {
			client.release();
		}

	}


	public async getRestaurant
	(email: IRestaurant['email']): Promise<IRestaurant | null> 
	{
		const client = await this.pool.connect();

		try {
			const restaurantModel = new RestaurantModel(client);
			return (await restaurantModel.get(email));
		} finally {
			client.release();
		}

	}


	public async updateRestaurant
	(restaurant: IRestaurantOpt): Promise<IRestaurant | null>
	{
		const client = await this.pool.connect();

		try {
			const restaurantModel = new RestaurantModel(client);
			return (await restaurantModel.update(restaurant));
		} finally {
			client.release();
		}

	}


	public async deleteRestaurant
	(email: IRestaurant['email']): Promise<boolean>
	{
		const client = await this.pool.connect();

		try {
			const restaurantModel = new RestaurantModel(client);
			return (await restaurantModel.delete(email));
		} finally {
			client.release();
		}

	}


}
