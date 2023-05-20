import express from 'express';

const router = express.Router();

router.use('/items', require('./items'));
router.use('/restaurant/items', require('./restaurantItems'));
router.use('/orders', require('./orders'));

module.exports = router;