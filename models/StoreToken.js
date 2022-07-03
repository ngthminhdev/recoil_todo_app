const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StoreTokenSchema = new Schema(
  {
    refreshToken: { type: String },
  },
  {
    collection: "storetokens",
    timestamps: true,
    autoIndexId: true,
  }
);

module.exports =
  mongoose.models.StoreToken || mongoose.model("StoreToken", StoreTokenSchema);
