import connectDB from "../../../database";
import Rating from "../../../models/Rating";
import Product from "../../../models/Product";
import mongoose from "mongoose";

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  const { userId, rate, targetId } = req.body;

  switch (method) {
    case "POST":
      try {
        // const _id = new mongoose.Types.ObjectId();
        // const id = mongoose.Types.ObjectId(userId);

        const product = await Rating.find({ targetId, userId });

        if (product.length > 0) {
          return res.status(409).json({
            success: false,
            message: "Bạn đã đánh giá sản phẩm này rồi!",
          });
        }

        await Rating.create({ userId, rate, targetId });
        const rating = await Rating.aggregate([
          {
            $group: { _id: "$targetId", avg: { $avg: "$rate" } },
          },
        ]);

        await Product.findByIdAndUpdate(targetId, {
          rating: rating[0].avg.toFixed(2).toString(),
        });

        return res
          .status(200)
          .json({ success: true, message: "Bạn đã đánh giá thành công" });
      } catch (error) {
        return res.status(500).json(error.message);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default handler;
