const mongoose = require("mongoose");
require("./Cart");
require("./Product");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    googleId: { type: String, default: '' }, 
    username: { type: String, required: true, minLength: 6 },
    password: { type: String },
    role: { type: String, required: true, default: "basic" },
    image: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/manga-dev/image/upload/v1658737930/my-uploads/anoymousUser_hmpihv.png",
    },
    notifications: { type: Array },
    cart: [
        {
          _id: false,
          product: { type: Schema.Types.ObjectId, ref: "Product" },
          size: { type: String },
          quantity: { type: Number },
        },
      ],
    },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
