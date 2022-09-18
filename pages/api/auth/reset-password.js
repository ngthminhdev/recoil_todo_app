const nodemailer = require("nodemailer");
const randtoken = require("rand-token");
const bcrypt = require("bcrypt");

import User from "../../../models/User";
import PasswordToken from "../../../models/PasswordToken";
import connectDB from '../../../database';


const resetPassWordHandler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { token } = req.query;
  const { password: newPassword } = req.body;

  console.log(token);

  switch (method) {
    case "POST":
      try {
        const tokenChecker = await PasswordToken.findOne({token});

        if (!tokenChecker) {
            return res.status(404).json({ success: false, message: "Link is not valid"});
        }

        //Bcrypyt password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);

        await User.findOneAndUpdate({email: tokenChecker.email}, {
            password: password,
        })

        await PasswordToken.findOneAndDelete({token})

        return res.status(200).json({ success: true, message: 'Your Password has been updated successfully!' })
      
      } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e });
      }
      break;
    default:
      return res
        .status(500)
        .json({ success: true, message: "Method not allowed" });
  }
};

export default resetPassWordHandler;
