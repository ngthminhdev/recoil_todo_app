const nodemailer = require("nodemailer");
const randtoken = require("rand-token");
import User from "../../../models/User";
import PasswordToken from "../../../models/PasswordToken";
import connectDB from '../../../database';


const forgotPassWordHandler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { email } = req.body;

  switch (method) {
    case "POST":
      try {
        const currentUser = await User.findOne({ email: email });
        if (!currentUser) {
          return res
            .status(404)
            .json({ success: false, message: "Email not found" });
        }

        const token = randtoken.generate(16);
        await PasswordToken.create({ email, token });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "minhcloudinary@gmail.com",
            pass: "wenqafmrinypywot",
          },
        });

        const options = {
          from: "minhcloudinary@gmail.com",
          to: email,
          subject: "MikiShop Reset Password",
          // text: "Đây là email text",
          html: `<h2>Email from MikiShop</h2><p>Ấn vào <a href="http://localhost:3000/auth/reset-password?token=${token}">đây</a> để đặt lại mật khẩu của bạn </p>`,
        };

        transporter.sendMail(options, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("mail sent successfully");
        });

        return res.status(200).json({ success: true, message: 'Reset passworrd link has sent to your email successfully!'});

      } catch (e) {
        console.log(e);
        return res.status(500).send({ success: false, message: e });
      }
      break;
    default:
      return res
        .status(500)
        .json({ success: true, message: "Method not allowed" });
  }
};

export default forgotPassWordHandler;
