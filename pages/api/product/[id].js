import connectDB from "../../../database";
import Product from "../../../models/Product";
import Comment from "../../../models/Comment";

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        return res.status(200).json({ success: true, product: product });
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    case "DELETE":
      try {
        await Product.findByIdAndDelete(id);
        // console.log(result);
        return res.status(201).json({
          success: true,
          message: "Product deleted!",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "POST":
      try {
        const { userId, content, targetId } = req.body;
        const newComment = await Comment.create({ userId, content, targetId });

        // console.log(newComment);
        // const product = await Product.findByIdAndUpdate(id,
        // {
        //   $push : {comments: newComment}
        // }, { new: true });

        return res.status(200).json("Commented: " + newComment);
      } catch (error) {
        return res.status(500).json(error.message);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default handler;
