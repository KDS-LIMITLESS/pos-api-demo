import express from 'express';
import RestaurantControllers from '../controllers/restaurantCTRL';
import UserControllers from '../controllers/userCTRL';

const restaurantCTRL = new RestaurantControllers;
const UserCTRL = new UserControllers;

const router = express.Router();

router.post('/create', restaurantCTRL.createRestaurant, UserCTRL.createUser);

router.get('/get', restaurantCTRL.getRestaurant);

router.post('/update', restaurantCTRL.updateRestaurant);

router.post('/delete', restaurantCTRL.deleteRestaurant);


module.exports = router;
