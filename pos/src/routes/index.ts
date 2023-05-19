import express from 'express';

const router = express.Router();

router.use('/items', require('./items'));
router.use('/items/restaurant', require('./restaurantItems'));
router.use('/orders', require('./orders'));

module.exports = router;