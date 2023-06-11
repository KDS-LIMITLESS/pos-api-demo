import express from 'express';
import tokens from '../middlewares/tokens';
import RestaurantControllers from '../controllers/restaurantCTRL';

const restaurantCTRL = new RestaurantControllers;

const router = express.Router();

router.post('/create', restaurantCTRL.createRestaurant);
router.post('/registerationURL', restaurantCTRL.addUser)

router.get('/get', restaurantCTRL.getRestaurant);

router.put(
  '/update', 
  tokens.verifyTokenAndCheckAdmin, 
  restaurantCTRL.updateRestaurant
);

router.delete
  (
    '/delete',
    tokens.verifyTokenAndCheckAdmin,
    restaurantCTRL.deleteRestaurant
  );


module.exports = router;

//from dusk till dawn