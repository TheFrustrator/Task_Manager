import express from 'express';
import {
  getCurrentUser,
  loginUser,
  registerUser,
  updatePassword,
  updateProfile
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// PUBLIC ROUTES
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// PROTECTED ROUTES (Require Authentication)
userRouter.get('/me', authMiddleware, getCurrentUser); // ✅ Fixed path here
userRouter.put('/profile', authMiddleware, updateProfile);
userRouter.put('/password', authMiddleware, updatePassword);

export default userRouter;
