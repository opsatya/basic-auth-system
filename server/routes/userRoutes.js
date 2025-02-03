import express from 'express';
import { registerUser, loginUser, googleLogin, getMe } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.get('/me', protect, getMe);

export default router;