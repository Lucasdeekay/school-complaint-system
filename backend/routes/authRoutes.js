// backend/routes/authRoutes.js
import { Router } from 'express';
const router = Router();
import { register, registerAdmin, login, changePassword, forgotPassword, resetPassword } from '../controllers/authController';
import verifyToken from '../middleware/auth';

router.post('/register', register);
router.post('/register-admin', registerAdmin);
router.post('/login', login);
router.post('/change-password', verifyToken, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
