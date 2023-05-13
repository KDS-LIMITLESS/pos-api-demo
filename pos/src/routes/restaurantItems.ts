import express from 'express';
import RestaurantItemsControllers from '../controllers/restaurantItems';


const restaurantItemsControllers = new RestaurantItemsControllers;

const router = express.Router();

router.post('/import', restaurantItemsControllers.importItem);
router.get('/all', restaurantItemsControllers.getAllItems);
router.get('/get', restaurantItemsControllers.getItem);
router.patch('/update', restaurantItemsControllers.updateItem);
router.delete('/delete', restaurantItemsControllers.deleteItem);


module.exports = router