import express from 'express';
import UserControllers from '../controllers/userCTRL';

const UserCTRL = new UserControllers;
const router = express.Router();

router.post('/create-user', UserCTRL.create);
router.post('/login', UserCTRL.login);

module.exports = router;