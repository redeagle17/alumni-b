import { UserProfile } from "../models/user.profile.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";

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
    profileImage,
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
    !profileImage ||
    !workExperiences
  ) {
    return next(new errorHandler(400, "All fields are required"));
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
    profileImage: profileImage,
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

const getAllUserProfiles = asyncHandler(async (req, res, next) => {
  const userProfiles = await UserProfile.find();
  if (!userProfiles) {
    return next(new errorHandler(404, "Data not found"));
  }
  return res
    .status(200)
    .json(
      new responseHandler(
        200,
        userProfiles,
        "User profiles fetched successfully"
      )
    );
});

const getSingleUserProfile = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const singleUserProfile = await UserProfile.findOne({ user_id });
  if (!singleUserProfile) {
    return next(new errorHandler(404, "User profile not found"));
  }
  singleUserProfile.workExperiences.sort((a, b) => {
    if (a.currentWork && !b.currentWork) return -1;
    if (!a.currentWork && b.currentWork) return 1;
    return new Date(b.endDate) - new Date(a.endDate);
  });

  const formatWorkExperience = (experience) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return experience.map((exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.currentWork ? null : new Date(exp.endDate);

      const formattedStartDate = `${
        months[startDate.getMonth()]
      }-${startDate.getFullYear()}`;
      const formattedEndDate = exp.currentWork
        ? "Present"
        : `${months[endDate.getMonth()]}-${endDate.getFullYear()}`;

      return {
        position: exp.position,
        company: exp.company,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        currentWork: exp.currentWork,
        _id: exp._id,
      };
    });
  };
  const updatedSingleUserProfile = {
    ...singleUserProfile.toObject(),
    workExperiences: formatWorkExperience(singleUserProfile.workExperiences),
  };

  return res
    .status(200)
    .json(
      new responseHandler(
        200,
        updatedSingleUserProfile,
        "User profiles fetched successfully"
      )
    );
});

export { userProfile, getAllUserProfiles, getSingleUserProfile };
