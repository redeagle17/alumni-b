import { Router } from "express";
import {
  userProfile,
  getAllUserProfiles,
  getSingleUserProfile,
} from "../controllers/user.profile.controller.js";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
router.post("/profile", userProfile);

router.get("/all_users_profile", getAllUserProfiles);

router.get("/:user_id/single_user_profile", getSingleUserProfile);

export default router;
