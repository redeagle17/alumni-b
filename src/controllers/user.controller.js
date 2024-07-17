import { User } from "../models/user.model.js";
import { UserProfile } from "../models/user.profile.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new errorHandler(409, "User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    const createdUser = {
      _id: newUser._id,
      email: newUser.email,
    };
    return res
      .status(201)
      .json(
        new responseHandler(200, createdUser, "User registered Successfully")
      );
  } catch (error) {
    console.log(
      "Something went wrong while registering the user" + error.message
    );
    throw new errorHandler(
      500,
      "Something went wrong while registering the user"
    );
  }
});

export { registerUser }