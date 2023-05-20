import SQL from 'sql-template-strings';
import { pool as db } from './connection';
import AppConstants from '../app-constants/custom';
import { generateUniqueIDs } from '../utils/mail';


export interface IRestaurant {
  restaurant_id: string;
  business_name: string;
  business_address: string;
  mode: string // MULTI STORE | SINGLE STORE
  parentt_restaurant_id?: string | ''
}

export declare type IRestaurantOpt = Partial<IRestaurant>


export class RestaurantModel {
 
  /**
  Creates a new Resturant
  @param: business_name, phone_number, restaurant_id, verification_status, owner
  @returns Restaurant
  */
  public async createRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
    const { rows } = await db.query<IRestaurant>(
      
      SQL`INSERT INTO restaurants (
        restaurant_id,
        business_name, 
        business_address,
        mode,
        parent_restaurant_id
        
      ) VALUES ($1,$2,$3,$4, $5) RETURNING *`,
      [
        await generateUniqueIDs(AppConstants.ID_CHARS),
        restaurant.business_name,
        restaurant.business_address,
        restaurant.mode,
        restaurant.parentt_restaurant_id,
      ]
    );
    return rows[0];
  }

  /**
  * gets a Restaurant's details if it exists
  * @param restaurant_id
  * @returns Restaurant or null
  */

  public async getRestaurant(id: IRestaurant['restaurant_id']): 
  Promise<IRestaurant | null> {
    const { rows } = await db.query<IRestaurant>(
      'SELECT * FROM restaurants WHERE restaurant_id = $1',
      [id]
    );
    return rows ? rows[0] : null;
  }

  /**
  * Update a Restaurant details
  * @param restaurant_id, business_name (optional), phone_number (optional),
  * verification_status (optional), admin (optional)
  * @returns IRestaurant
  */
  public async updateRestaurant(restaurant: IRestaurantOpt): Promise<IRestaurant> {
    const { rows } = await db.query<IRestaurant> (`UPDATE restaurants SET 
      business_name = COALESCE($2, business_name),
      owner = COALESCE($3, owner),
      business_address = COALESCE($4, business_address),
      WHERE restaurant_id = $1
      RETURNING *`,
    [
      restaurant.restaurant_id,
      restaurant.business_name,
      restaurant.business_address
    ]
    );
    return rows[0];
  }

  /**
  * Delete a resturant
  * @param restaurant_id
  * @returns boolean
  */

  public async deleteRestaurant(id: IRestaurant['restaurant_id']
  ): Promise<boolean> 
  {
    const { rowCount } = await db.query(
      'DELETE FROM restaurants WHERE restaurant_id = $1',
      [id]
    );
    return rowCount == 1;
  }

  async updateRestaurantDetails(business_name: string, 
    business_address: string, restauraant_id:string): Promise<IRestaurant> 
  {
    const { rows } = await db.query(`UPDATE restaurants SET 
      business_name = $1, 
      business_address = $2
      WHERE restauraant_id = $3`,
    [business_name, business_address, restauraant_id]
    );
    return rows[0];
  }

  async changeRestaurantMode(restaurant_id: string, 
    restaurant_mode: string): Promise<IRestaurant>
  {
    const { rows } = await db.query(`UPDATE restaurants SET
      mode = $1 WHERE restaurant_id = $2`,[restaurant_mode, restaurant_id]
    );
    return rows[0];
  }

  // MULTI STORE RETAURANT
}