import { UserProfile } from "../models/user.profile.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const userProfile = asyncHandler(async (req, res, next) => {
  const {
    user_id,
    firstName,
    lastName,
    location,
    gender,
    headline,
    phone,
    linkedin,
    github,
    twitter,
    college,
    department,
    about,
    workExperiences,
  } = req.body;

  if (
    !user_id ||
    !firstName ||
    !lastName ||
    !location ||
    !gender ||
    !headline ||
    !phone ||
    !linkedin ||
    !github ||
    !twitter ||
    !college ||
    !department ||
    !about ||
    !workExperiences
  ) {
    return next(new errorHandler(400, "All fields are required"));
  }
  const profileImageLocalPath = req.files?.profileImage[0]?.path;
  if (!profileImageLocalPath) {
    return next(new errorHandler(400, "Profile Image is required"));
  }
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  if (!profileImage) {
    return next(new errorHandler(400, "Profile Image is required"));
  }

  const parsedWorkExperiences = workExperiences.map((exp) => ({
    ...exp,
    currentWork: exp.currentWork === "true" || exp.currentWork === true,
  }));

  const userProfileData = await UserProfile.create({
    user_id,
    firstName,
    lastName,
    location,
    gender,
    headline,
    phone,
    linkedin,
    github,
    twitter,
    college,
    department,
    about,
    profileImage: profileImage.url,
    workExperiences: parsedWorkExperiences,
  });

  if (!userProfileData) {
    return next(
      new errorHandler(500, "Something went wrong! Please try again later")
    );
  }

  return res
    .status(201)
    .json(new responseHandler(200, [], "User data added Successfully"));
});

export { userProfile };
