import express from 'express';
import OrdersControllers from '../controllers/orders';

const ordersControllers = new OrdersControllers;
const router = express.Router();

router.post('/create', ordersControllers.createOrder);
router.get('/all', ordersControllers.getRestaurantOrders);
router.get('/get', ordersControllers.getOrder);
router.delete('/delete', ordersControllers.deleteOrder);

module.exports = router