const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./Product");
require("./User");

const BuyerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    targetId: { type: Schema.Types.ObjectId, ref: 'Product' },
    isFeedback: { type: Boolean, default: false },
}, {
    collection: 'buyers',
    timestamps: true
})

module.exports = mongoose.models.Buyer || mongoose.model('Buyer', BuyerSchema);
