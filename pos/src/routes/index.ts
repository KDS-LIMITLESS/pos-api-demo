import express from 'express';

const router = express.Router();

router.use('/items', require('./itemsRoutes'));
router.use('/items/restaurant', require('./restaurantItemsRoutes'));

module.exports = router;