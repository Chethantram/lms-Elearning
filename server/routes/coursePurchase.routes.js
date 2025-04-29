import express from 'express';
import isAuthenticated from '../middleware/isAuntenticated.js'
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailsWithPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';

const router = express.Router();

router.post("/checkout/create-checkout-session",isAuthenticated,createCheckoutSession);
router.post("/webhook",express.raw({type:"application/json"}),stripeWebhook);
router.get("/course/:courseId/detail-with-status",isAuthenticated,getCourseDetailsWithPurchaseStatus);
router.get("/",isAuthenticated,getAllPurchasedCourse);


export default router;