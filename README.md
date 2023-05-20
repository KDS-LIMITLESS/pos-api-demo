# APIs implemented


## Restaurant APIs
1. `/api/restaurant/create` - creates a restaurant
   requirement: `business_name`, `phone_number`, `admin`
2. `/api/restaurant/get` - get a restaurant's details
    requirement: `restaurant_id`
3. `/api/restaurant/update` - updates a restaurant
    requirement: `restaurant_id`, `business_name`, `phone_number`, `admin`
4. `/api/restaurant/delete` - deletes a restaurant
    requirement: `restaurant_id`

## General Items APIs
1. `/api/items/create` - create an item in the general items list
    requirement: `item_name`, `item_category`, `item_price`
2. `/api/items/get` - get an item's details
    requirement: `item_name`
3. `/api/items/all` - get all items
   requirement: None

## Restaurant Items APIs
1. `/api/restaurant/items/import` - imports an item in the restaurant's items list from the general list
    requirement: `restaurantID`, `item_name`
2. `/api/restaurant/items/all` - get all items in a particular restaurant
    requirement: `restaurantID`
3. `/api/restaurant/items/get` - get an item's details in a particular restaurant
    requirement: `restaurantID`, `item_name`
4. `/api/restaurant/items/update` - update an item's price in a particular restaurant
    requirement: `restaurantID`, `item_name`, `item_price`
5. `/api/restaurant/items/delete` - delete an item in a particular restaurant
    requirement: `restaurantID`, `item_name`


## Orders APIs
1. `/api/orders/create` - create an order in a particular restaurant
    requirement: `restaurant_id`, `username`, `order_items` (Note that the `order_items` is an array that contains objects of each item in an order in this format: `item_name`, `quantity`, `price` and `amount`)
2. `/api/orders/get` - get an order's details
   requirement: `order_id`
3. `/api/orders/all` - get all orders in a particular restaurant
    requirement: `restaurant_id`
4. `/api/orders/delete` - delete an order (only authorized individuals can do this so be sure to verify their role before calling this API)
   requirement: `order_id`
   