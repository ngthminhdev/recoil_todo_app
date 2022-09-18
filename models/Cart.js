const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./Product");
require("./User");

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        _id: false,
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        size: { type: String },
        quantity: { type: Number },
      },
    ],
    payments: { type: Boolean, default: true },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

module.exports = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
