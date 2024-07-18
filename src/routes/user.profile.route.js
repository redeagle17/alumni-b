import { Router } from "express";
import { userProfile } from "../controllers/user.profile.controller.js";

const router = Router()

router.route("/profile").post(userProfile)

export default router