import SQL from 'sql-template-strings';
import { pool as db } from './connection';
import AppConstants from '../app-constants/custom';


export enum VerificationStatus {
  VERIFIED = 'VERIFIED',
  PENDING = 'PENDING'
}

export interface IRestaurant {
  restaurant_id: string,
  business_name: string,
  phone_number: string,
  verification_status: string,
  admin: string
}


export interface IRestaurantOpt {
  restaurant_id: string,
  business_name?: string,
  phone_number?: string,
  verification_status?: string,
  admin?: string
}




export class RestaurantModel{

	/**
   Generates an ID
   @param: null
   @returns new id
  */
private generateId(): string {
  const idLength = 6;
  const characters : string = AppConstants.ID_CHARS;
  let id : string = '';
  for (let i = 0; i < idLength; i++) {
    const index = Math.floor(Math.random() * characters.length);
    id += characters[index];
  }
  return id;
}

	/**
   Creates a new Resturant
   @param: business_name, phone_number, restaurant_id, verification_status, admin
   @returns Restaurant
  */
	public async create(restaurant: IRestaurant): Promise<IRestaurant> {
		const { rows } = await db.query<IRestaurant>(SQL `INSERT INTO 
            restaurants(
                restaurant_id,
                business_name, 
                phone_number, 
                verification_status,
                admin
            ) 
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            ) RETURNING *`,
		[
			this.generateId(),
			restaurant.business_name,
		    restaurant.phone_number,
            VerificationStatus.PENDING,
			restaurant.admin
		]
		);
		return (rows[0]);
	}


	/**
     * gets a Restaurant's details if it exists
     * @param restaurant_id
     * @returns Restaurant or null
     */

	public async get(id: IRestaurant['restaurant_id']): 
  Promise<IRestaurant | null> {
		const { rows } = await db.query<IRestaurant>(
			'SELECT * FROM restaurants WHERE restaurant_id = $1', [id]
		);

		return (rows ? rows[0] : null);
	}

	/**
     * Update a Restaurant details
     * @param restaurant_id, business_name (optional), phone_number (optional),
     * verification_status (optional), admin (optional)
     * @returns IRestaurant
     */

	public async update(restaurant: IRestaurantOpt): 
  Promise<IRestaurant> {
		const { rows } = await db.query<IRestaurant>(
			`UPDATE restaurants
                      SET business_name = COALESCE($2, business_name),
                      phone_number = COALESCE($3, phone_number),
                      verification_status = COALESCE($4, verification_status),
                      admin = COALESCE($5, admin)
                      WHERE restaurant_id = $1
                      RETURNING *`,
			[
				restaurant.restaurant_id,
				restaurant.business_name,
				restaurant.phone_number,
				restaurant.verification_status,
                restaurant.admin
			]
		);

		return (rows[0]);
	}

  
	/**
     * Delete a resturant
     * @param restaurant_id
     * @returns boolean
     */

	public async delete(id: IRestaurant['restaurant_id']): Promise<boolean>
	{
		const { rowCount } = await db.query(
			'DELETE FROM restaurants WHERE restaurant_id = $1',
			[id]
		);

		return (rowCount == 1);
	}
}
