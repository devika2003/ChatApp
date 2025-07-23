import express from "express"
import {protectRoute} from "../middleware/auth.middleware.js"


import {signup, login, logout,onboard} from "../controllers/auth.controller.js"
const router = express.Router();
router.post("/signup",signup)


router.post("/login",login)

router.post("/logout",logout)

router.post("/onboarding",protectRoute,onboard)
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router
//ImpL6lqT7CMFt5hX
//mongodb+srv://devikaspillai705:ImpL6lqT7CMFt5hX@cluster0.phpx8xs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0