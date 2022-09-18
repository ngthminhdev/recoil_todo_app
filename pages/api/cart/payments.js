import connectDB from "../../../database";
import Product from "../../../models/Product";
import Cart from "../../../models/Cart";
import User from "../../../models/User";
import Buyer from "../../../models/Buyer";

const paymentsHandler = async (req, res) => {
  await connectDB();
  const { method } = req;
  const { userId } = req.body;

  switch (method) {
    case "POST":
      try {
        const currentUser = await User.findById(userId);
        const cart = currentUser.cart;

        if (cart.length < 1) {
          return res.status(200).json({
            success: false,
            message: "Giỏ hàng trống, hãy tiếp tục mua sắm...",
          });
        }

        const newCart = await Cart.create({ user: userId, products: cart });


        for (const cartItem of cart) {
          await Product.findOneAndUpdate(
            { _id: cartItem.product, "storage.size": cartItem.size },
            { $inc: { "storage.$.quantity": -cartItem.quantity } }
          );

          await Buyer.create({targetId: cartItem.product, userId: userId})
        }

        await User.findByIdAndUpdate(userId, {
          $set: { cart: [] }
        })

        return res.status(200).json({ success: true, cart: newCart });
      } catch (err) {
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(500).json("Faild to connect to server");
  }
};

export default paymentsHandler;
