import User from "../../../models/User";
import connectDB from "../../../database";
import withAuth from "../../../app/middleware/withAuth"
import withRoles from "../../../app/middleware/withRoles"

connectDB();

const userHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        return res.status(200).json({
          success: true,
          users: users,
        });
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default withAuth(userHandler);
