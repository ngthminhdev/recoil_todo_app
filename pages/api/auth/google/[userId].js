import connectDB from "../../../../database";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../app/generateTokens";
import cookie from "cookie";
import User from "../../../../models/User";
import StoreToken from "../../../../models/StoreToken";

const returnHandler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { id } = req.body;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await StoreToken.create({ _id: user._id, refreshToken: refreshToken });

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, //True khi deloy
            path: "/",
            sameSite: "strict",
          })
        );

        return res.status(200).json({
          success: true,
          message: "Login successful",
          user,
          accessToken,
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: err });
      }
      break;
    default:
      res.status(500).json({ success: false, message: "Methods not allowed!" });
      break;
  }
};

export default returnHandler;
