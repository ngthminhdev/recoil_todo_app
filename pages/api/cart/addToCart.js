import connectDB from "../../../database";
import Product from "../../../models/Product";
import Cart from "../../../models/Cart";
import User from "../../../models/User";

const handler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { userId, product } = req.body;

  switch (method) {
    case "POST":
      try {
        // console.log(userId, product);

        const currentUser = await User.findById(userId);
        const cart = await currentUser.cart;
        const index = cart.findIndex(
          (item) => item.product.toString() === product.id
        );
        let message = "Số lượng không hợp lệ";

        if (index !== -1) {
          cart.splice(index, 1);
          await User.findByIdAndUpdate(userId, { cart }, { new: true });
          message = "Xoá sản phẩm khỏi giỏ hàng thành công!";
        }

        if (product.quantity > 0) {
          await User.findByIdAndUpdate(
            userId,
            {
              $addToSet: {
                cart: {
                  product: product.id,
                  size: product.size,
                  quantity: product.quantity,
                },
              },
            },
            { new: true }
          );
          message = "Thêm vào giỏ hàng thành công!";
        }

        return res.status(200).json({
          success: true,
          message: message,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default handler;
