import express from 'express';

const router = express.Router();

router.use('/items', require('./itemsRoutes'));

module.exports = router;