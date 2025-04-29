import express from 'express';
import {registerUser,loginUser, logoutUser, getUserprofile, updateProfile} from '../controllers/user.controllers.js'
import isAuthenticated from '../middleware/isAuntenticated.js';
import upload from '../utils/multer.js';
const router = express();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/profile',isAuthenticated,getUserprofile);
router.put('/profile/update',isAuthenticated,upload.single("photoUrl"),updateProfile);

export default router;