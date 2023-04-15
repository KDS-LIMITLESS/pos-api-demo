import { PoolClient } from 'pg';
import SQL from 'sql-template-strings';


export interface IRestaurant {
    full_name: string,
    email: string,
    password: string,
    phone_number: string
}


export interface IRestaurantOpt {
    full_name?: string,
    email: string,
    password?: string,
    phone_number?: string
}




export class RestaurantModel{

	public constructor(private client: PoolClient) {}

	/**
   Creates a new Resturant
   @param: details of resturant to be created
   @returns IRestaurant
  */
	public async create(restaurant: IRestaurant): Promise<IRestaurant> {
		const { rows } = await this.client.query<IRestaurant>(SQL `INSERT INTO 
            restaurants(
                full_name, 
                email, 
                password, 
                phone_number
            ) 
            VALUES (
                $1,
                $2,
                $3,
                $4
            ) RETURNING *`,
		[
			restaurant.email,
			restaurant.full_name,
			restaurant.password,
			restaurant.phone_number
		]
		);
		return (rows[0]);
	}


	/**
     * gets a Restaurant's details
     * @param email string
     * @returns IRestaurant
     */

	public async get 
	(email: IRestaurant['email']): Promise<IRestaurant | null>
	{
		const { rows } = await this.client.query<IRestaurant>(
			'SELECT * FROM restaurants WHERE email = $1', [email]
		);

		return (rows.length ? rows[0] : null);
	}

	/**
     * Update a Restaurant
     * @param details that can be updated
     * @returns IRestaurant
     */

	public async update
	(restaurant: IRestaurantOpt): Promise<IRestaurant | null>
	{
		const resturant = this.get(restaurant.email);
		if(!resturant) return (null);

		const { rows } = await this.client.query<IRestaurant>(
			`UPDATE restaurants
                      SET full_name = COALESCE($2, full_name),
                      password = COALESCE($3, password),
                      phone_number = COALESCE($4, phone_number)
                      WHERE email = $1
                      RETURNING *`,
			[
				restaurant.email,
				restaurant.full_name,
				restaurant.password,
				restaurant.phone_number
			]
		);

		return (rows[0]);
	}

  
	/**
     * Delete a resturant
     * @param email string
     * @returns boolean
     */

	public async delete
	(email: IRestaurant['email']): Promise<boolean>
	{
		const { rowCount } = await this.client.query(
			'DELETE FROM restaurants WHERE email = $1',
			[email]
		);

		return (rowCount == 1);
	}
}
