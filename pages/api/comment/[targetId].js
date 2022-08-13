import connectDB from "../../../database";
import Comment from "../../../models/Comment";

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  const { targetId } = req.query;

  switch (method) {
    case "GET":
      try {
        // console.log(targetId);
        const comments = await Comment.find({ targetId })
          .sort({ createdAt: -1 })
          .populate("userId");
        return res.status(200).json({
          success: true,
          comments: comments,
        });
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default handler;
