import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { generateAccessToken } from "../config/generateToken.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, role, password } = req.body;

  if (!name || !email || !role || !password) {
    res.status(400);
    throw new Error("All field are required");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    // check if user exist
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    // create new user
    name,
    email,
    role,
    password,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateAccessToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error("Failed to create user!");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateAccessToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

export { register, login };
