import User from "../../../models/User";
import StoreToken from "../../../models/StoreToken";
import bcrypt from "bcrypt";
import connectDB from "../../../database";
import cookie from "cookie";
import { generateAccessToken, generateRefreshToken } from "../../../app/generateTokens";

connectDB();

const loginHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email }).lean();
        //Check email
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: "Email is not registered" });
        }
        //check password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return res.status(401).json({
            success: false,
            message: "Email or password is incorrect",
          });
        }

        if (user && validPassword) {
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          // console.log(refreshToken, typeof refreshToken);
          await StoreToken.create({ _id: user._id, refreshToken: refreshToken });
          //Send cookie to browser
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false, //True khi deloy
              path: "/",
              sameSite: "strict",
            })
          );
          //Return user infomation and accessToken
          const { password, ...others } = user;
          return res.status(200).json({
            success: true,
            message: "Login successful",
            user: { ...others },
            accessToken,
          });
        }
      } catch (err) {
        return res.status(400).json({ success: false, message: err });
      }
      break;
    default:
      res.status(500).json({ success: false });
      break;
  }
};

export default loginHandler;
