import express from 'express';
import ItemsControllers from '../controllers/items';
import tokens from '../middlewares/tokens';

const itemsControllers = new ItemsControllers;
const router = express.Router();

router.post(
  '/create', 
  tokens.verifyTokenAndCheckAdmin, 
  itemsControllers.createItem
);

router.get('/all', itemsControllers.getAllItems);
router.get('/get', itemsControllers.getItem);

module.exports = router