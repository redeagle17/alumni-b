import { UserProfile } from "../models/user.profile.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";

const userProfile = asyncHandler(async(req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    res
    .status(201)
    .json(
      new responseHandler(201, req.body, "User profile fetched successfully")
    );
})

export { userProfile }