const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    rate: { type: Number },
    targetId: { type: Schema.Types.ObjectId, ref: 'Product' },
}, {
    collection: 'ratings',
    timestamps: true
})

module.exports = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);
