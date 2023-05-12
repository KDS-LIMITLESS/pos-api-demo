import express from 'express';

const router = express.Router();

router.use('/items', require('./items'));
router.use('/items/restaurant', require('./restaurantItems'));

module.exports = router;