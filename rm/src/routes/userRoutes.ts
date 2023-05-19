import express from 'express';
import UserControllers from '../controllers/userCTRL';
import tokens from '../middlewares/tokens';

const UserCTRL = new UserControllers;
const router = express.Router();

router.get('/user-profile', tokens.verifyUser, UserCTRL.getUserProfile);
router.post('/create-user', UserCTRL.createUser);
router.post('/login', UserCTRL.login);

router.post('/suspend-user', tokens.verifyTokenAndCheckAdmin,
  UserCTRL.suspendUserAccount
);
router.post('/verify-user-otp', UserCTRL.verifyOTP);
router.post('/send-otp', UserCTRL.OTP);
router.post('/resend-otp', UserCTRL.OTP);
router.put('/update-user-profile', tokens.verifyUser, UserCTRL.updateUserProfile);

router.delete('/delete-user-account', tokens.verifyTokenAndCheckAdmin, 
  UserCTRL.deleteUserAccount
);

module.exports = router;