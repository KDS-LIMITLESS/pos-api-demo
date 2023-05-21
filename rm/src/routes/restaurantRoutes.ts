import express from 'express';
import RestaurantControllers from '../controllers/restaurantCTRL';

const restaurantCTRL = new RestaurantControllers;

const router = express.Router();

router.post('/create', restaurantCTRL.createRestaurant);

router.get('/get', restaurantCTRL.getRestaurant);

router.put('/update', restaurantCTRL.updateRestaurant);

router.delete('/delete', restaurantCTRL.deleteRestaurant);


module.exports = router;
