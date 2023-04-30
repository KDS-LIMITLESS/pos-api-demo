import express from 'express';
import RestaurantControllers from '../controllers/restaurantCTRL';

const restaurantCTRL = new RestaurantControllers;
const router = express.Router();

router.post('/create', restaurantCTRL.createRestaurant);

router.get('/get', restaurantCTRL.getRestaurant);

router.post('/update', restaurantCTRL.updateRestaurant);

router.post('/delete', restaurantCTRL.deleteRestaurant);


module.exports = router;
