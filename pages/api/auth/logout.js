import StoreToken from "../../../models/StoreToken";
import connectDB from "../../../database";
import cookie from "cookie";

connectDB();

const logoutHandler = async (req, res) => {
  const { method } = req;
  const { id } = req.body;

  switch (method) {
    case "POST":
      try {
        await StoreToken.findByIdAndDelete(id);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("refreshToken", "", {
            maxAge: -1,
            path: "/",
          })
        );
        return res.status(200).json("Logged out!");
      } catch (err) {
        return res.status(400).json({ success: false, message: err });
      }
      break;
    default:
      res.status(500).json({ success: false });
      break;
  }
};

export default logoutHandler;
