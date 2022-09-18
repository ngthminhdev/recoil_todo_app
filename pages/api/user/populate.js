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
        // const populate = await User.findById("62e0fc770276ea3437ee7364").populate("cart.product")

        const quantity = 10;

        const populate = await Product.findOneAndUpdate(
          { _id: "62fc63ae24b9379970de8e11", "storage.size": "4"},
          { $inc: { "storage.$.quantity": -quantity } }, { new: true }
        );

        // const populate = await User.findByIdAndUpdate('62e0fc770276ea3437ee7364', {
        //   $set: {cart: []}
        // }, { new: true })

        // const populate = await Comment.findOne({
        //   targetId: "62fc63ae24b9379970de8e11",
        //   userId: "62e0eeef6fbbb998192c62a8",
        // });
        // console.log(populate);

        // .populate({
        //   path: "comments",
        //   populate: "targetId"
        // });

        // const comments = await Comment.aggregate([
        //   { $match: { targetId: "62dd6843b7fa3bd8f3f6eea7" }},
        //   { $group: { _id: "$targetId", comments: { $push: "$$ROOT" } } },
        // ])

        // const comments = await Comment.find({targetId: "62dd6843b7fa3bd8f3f6eea7"});

        return res.status(200).json(populate);
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default userHandler;
