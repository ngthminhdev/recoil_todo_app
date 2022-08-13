import User from "../../../models/User";
import Product from "../../../models/Product";
import Comment from "../../../models/Comment";
import connectDB from "../../../database";


connectDB();

const userHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // const users = await Product.findById("62dd6843b7fa3bd8f3f6eea7").populate("comments").populate({
        //   path: "comments",
        //   populate: "targetId"
        // });

        const comments = await Comment.aggregate([
          // { $match: { targetId: "62dd6843b7fa3bd8f3f6eea7" }},
          { $group: { _id: "$targetId", comments: { $push: "$$ROOT" } } },
        ])

        // const comments = await Comment.find({targetId: "62dd6843b7fa3bd8f3f6eea7"});

        return res.status(200).json(comments);
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default userHandler;
