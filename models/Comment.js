const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    rate: { type: Number },
    targetId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    isReplied: { type: Boolean, default: false }
}, {
    collection: 'comments',
    timestamps: true
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
