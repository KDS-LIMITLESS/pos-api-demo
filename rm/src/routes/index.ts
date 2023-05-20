import express from 'express';
import UserControllers from '../controllers/userCTRL';

const UserCTRL = new UserControllers;

const router = express.Router();

router.use('/users', require('./userRoutes'));

router.use('/restaurant', require('./restaurantRoutes'));

// MAIL AUTH ENDPOINTS
router.post('/verify-user-otp', UserCTRL.verifyOTP);
router.post('/send-otp', UserCTRL.OTP);
router.post('/resend-otp', UserCTRL.OTP);

module.exports = router;
