import connectDB from "../../../database";
import Comment from "../../../models/Comment";
import Product from "../../../models/Product";
import Buyer from "../../../models/Buyer";
import User from "../../../models/User";
import mongoose from "mongoose";

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  const { userId, content, rate, targetId } = req.body;

  switch (method) {
    case "GET":
      try {
        return res
          .status(200)
          .json({
            success: false,
            message: "Please insert query string!",
          });
      } catch (err) {
        return res.status(500).json(err);
      }
    case "POST":
      try {
        const _id = new mongoose.Types.ObjectId();
        const notify = await Comment.findByIdAndUpdate(targetId, {
          isReplied: true,
        });

        if (notify) {
          const fromUser = await User.findById(userId);
          const toUser = await Comment.findById(targetId).populate(
            "userId",
            "username"
          );
          await User.findByIdAndUpdate(
            toUser.userId._id,
            {
              $push: {
                notifications: {
                  $each: [
                    {
                      _id: _id.toString(),
                      content:
                        fromUser.username + " vừa trả lời bình luận của bạn",
                    },
                  ],
                  $position: 0,
                },
              },
            },
            { new: true }
          );
        }
        const product = await Buyer.findOne({ targetId, userId });
        // console.log(product);

        if (!product) {
          return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền đánh giá sản phẩm này! Vui lòng mua trước'
          })
        }

        if (product.isFeedback) {
          return res.status(409).json({
            success: false,
            message: "Bạn đã đánh giá sản phẩm này rồi!",
          });
        }

        await Buyer.findOneAndUpdate(
          { targetId, userId },
          { $set: { isFeedback: true}}
        )

        await Comment.create({ userId, content, rate, targetId });

        const rating = await Comment.aggregate([
          {
            $group: { _id: "$targetId", avg: { $avg: "$rate" }, count: {$sum:1} },
          },
        ]);

        console.log(rating);
        await Product.findByIdAndUpdate(
          targetId,
          {
            rating: {
              rate: rating[0].avg.toFixed(1).toString(),
              count: rating[0].count
            }
          },
          { new: true }
        );

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
