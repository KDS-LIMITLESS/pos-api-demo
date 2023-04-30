import express from 'express';

const router = express.Router();

router.use('/users', require('./userRoutes'));

router.use('/restaurant', require('./restaurantRoutes'));

module.exports = router;
