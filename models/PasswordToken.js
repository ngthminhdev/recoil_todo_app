const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PasswordTokenSchema = new Schema(
  {
    email: { type: String },
    token: { type: String },
  },
  {
    collection: "passwordtokens",
    timestamps: true,
    autoIndexId: true,
  }
);

module.exports =
  mongoose.models.PasswordToken || mongoose.model("PasswordToken", PasswordTokenSchema);
