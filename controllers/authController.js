import mongoose from "mongoose";
import User from "../models/User.js"
import dotenv from 'dotenv';
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"
dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = new User ({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "user created!!!" });
  } catch (err) {
    res.status(400).json({ message: "Error creating in user: ", error: err.message });
  }
};

export const signIn= async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name:name });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res.cookie("access_token", token, {httpOnly : true}).status(200).json(user);

  } catch (err) {
    res.status(400).json({ message: "Error finding in user: ", error: err.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res.cookie("access_token", token, {httpOnly: true,}).status(200).json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res.cookie("access_token", token, {httpOnly: true,}).status(200).json(savedUser._doc);
    }
  } catch (err) {
    res.status(400).json({ message: "Error finding in user: ", error: err.message });
  }
};