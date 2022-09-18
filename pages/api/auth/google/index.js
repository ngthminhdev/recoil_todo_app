import passport from "passport";
import "../../../../config/passport";
import connectDB from "../../../../database";
import NextCors from "nextjs-cors";

const googleHandler = async (req, res) => {
  await connectDB();

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })(req, res);

};

export default googleHandler;
