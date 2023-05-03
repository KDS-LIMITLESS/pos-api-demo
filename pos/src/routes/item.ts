import express from 'express';
import ItemsControllers from '../controllers/item';

const itemsControllers = new ItemsControllers;
const router = express.Router();

router.post('/create', itemsControllers.createItem);
router.get('/all', itemsControllers.getAllItems);
router.get('/:item_name', itemsControllers.getItem);