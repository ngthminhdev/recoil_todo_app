import connectDB from "../../../database";
import Product from "../../../models/Product";

connectDB();

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // const users = await Product.find({});
        return res
          .status(200)
          .json({
            success: false,
            message: "Please insert query string!",
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
