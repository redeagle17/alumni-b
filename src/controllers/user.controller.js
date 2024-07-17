import { User } from "../models/user.model.js";
import { UserProfile } from "../models/user.profile.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";

// const registerUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new errorHandler(409, "User with email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({
//     email: email,
//     password: hashedPassword,
//   });
//   await newUser.save();
//   const createdUser = {
//     _id: newUser._id,
//     email: newUser.email,
//   };
//   return res
//     .status(201)
//     .json(
//       new responseHandler(200, createdUser, "User registered Successfully")
//     );
// });

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler(400, "Email and password are required"));
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new errorHandler(400, "Invalid email format"));
  }
  if (password.length < 6) {
    return next(
      new errorHandler(400, "Password must be at least 6 characters long")
    );
  }

  try {
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return next(new errorHandler(409, "User with this email already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: normalizedEmail,
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
        new responseHandler(201, createdUser, "User registered successfully")
      );
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

export { registerUser };
