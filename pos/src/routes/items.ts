import express from 'express';
import ItemsControllers from '../controllers/items';

const itemsControllers = new ItemsControllers;
const router = express.Router();

router.post('/create', itemsControllers.createItem);
router.get('/all', itemsControllers.getAllItems);
router.get('/get', itemsControllers.getItem);