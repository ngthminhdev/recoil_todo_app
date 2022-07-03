import User from "../../../models/User";
import connectDB from '../../../database';

import bcrypt from "bcrypt";

connectDB();
const registerHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const { email, password: plainTextPassword, username } = req.body;
      //Check username and email is valid?
      if (!username || !email) {
        return res
          .status(400)
          .json({ success: false, message: "Username or email is not a valid" });
      }
      //Check max length username
      if (username.length > 16) {
        return res
          .status(400)
          .json({ success: false, message: "Username more than 16 characters" });
      }
      //Check min length password
      if (plainTextPassword.length < 6) {
        return res
          .status(400)
          .json({ success: false, message: "Password less than 6 characters" });
      }
      //Check duplicate email
      const emailCheck = await User.findOne({ email: email }).lean();
      if (emailCheck) {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }
      //Check duplicate username
      const usernameCheck = await User.findOne({ username: username}).lean();
      if (usernameCheck) {
        return res
          .status(400)
          .json({ success: false, message: "Username already registered" });
      }
      //Bcrypyt password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(plainTextPassword, salt);
      //Create new User
      try {
        const newUser = await User.create({ email, password, username });
        const user = await newUser.save();
        return res.status(201).json({
          success: true,
          message: "User successfully registered",
          user: user,
        });
      } catch (error) {
        return res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default registerHandler;
