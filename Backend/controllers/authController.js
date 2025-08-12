import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ message: "User already exist", success: false });
    }
    const model = new userModel({ name, email, password });
    model.password = await bcrypt.hash(password, 10);
    await model.save();
    res.status(201).json({ message: "SignUp successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Invalid credentials", success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "Invalid credentials", success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login success", success: true, jwtToken ,name:user.name,email });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};
