import connectDB from "../../../database";
import Rating from "../../../models/Rating";

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  const { targetId } = req.query;

  switch (method) {
    case "GET":
      try {
        // console.log(targetId);
        const comments = await Rating.find({ targetId })
          .sort({ createdAt: -1 })
          .populate("userId");
        return res.status(200).json(comments);
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default handler;
