import User from "../../../models/User";
import connectDB from "../../../database";

connectDB();

const userHandler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        return res.status(200).json({
          success: true,
          user: user
        });
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
      case "POST":
      try {
        const {notifyId} = req.body;
        // console.log(notifyId);

        const users = await User.findByIdAndUpdate(id, 
        {
          $pull: { notifications: { _id: notifyId } }
        }, { new: true });

        // const user = await User.findById(id);
        
        // const newNotify = await user.notifications.filter((noti) => {
        //   // console.log(noti._id + 'id');
        //   return (noti._id + 'id') !== (notifyId + 'id');
        // })

        // const newUser = await User.findByIdAndUpdate(id, {
        //   ...user,
        //   notifications : newNotify
        // })

        // console.log(newUser);

        return res.status(200).json(users);
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default userHandler;
