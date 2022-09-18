import passport from "passport";
import connectDB from "../../../../database";
import NextCors from "nextjs-cors";
// import "../../../../config/passport";
// import cookie from "cookie";
import { setCookie } from "cookies-next";

const googleHandler = async (req, res) => {
  await connectDB();
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await passport.authenticate("google", (err, user, info) => {
    if (err || !user)
      return res.status(200).json({ success: false, message: "false" });

    setCookie("refreshToken", info.refreshToken, { req, res });

    res.redirect(`http://localhost:3000/api/auth/google/${user._id}`);
  })(req, res);
};

export default googleHandler;
