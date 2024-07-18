import { Router } from "express";
import {
  userProfile,
  getAllUserProfiles,
} from "../controllers/user.profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/profile",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  userProfile
);

router.get("/all_users_profile", getAllUserProfiles);

export default router;
