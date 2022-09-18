import Product from "../../models/Product";
import connectDB from "../../database";

const searchHandler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { q } = req.body;
  switch (method) {
    case "POST":
      try {
        const product = await Product.aggregate([
          { $match: { $text: { $search: q } } },
          { $project: { name: 1, "storage.price": 1 } },
          { $sort: { score: { $meta: "textScore" } } },
        ]);

        return res.status(200).json({ success: true, product: product });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default searchHandler;
