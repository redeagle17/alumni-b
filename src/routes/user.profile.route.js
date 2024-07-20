import { Router } from "express";
import {
  userProfile,
  getAllUserProfiles,
  getSingleUserProfile,
} from "../controllers/user.profile.controller.js";

const router = Router();

router.post("/profile", userProfile);

router.get("/all_users_profile", getAllUserProfiles);

router.get("/:user_id/single_user_profile", getSingleUserProfile);

export default router;
