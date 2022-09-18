import connectDB from "../../../database";
import Product from "../../../models/Product";
import Cart from "../../../models/Cart";
import User from "../../../models/User";


const handler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { userId, products } = req.body;

  switch (method) {
    case "POST":
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
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default handler;
