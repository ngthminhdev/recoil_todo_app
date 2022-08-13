const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String},
    images: {type: Array},
    description: {type: String},
    category: {type: String},
    rating: {type: Object, default: {rate: "", count: 0}},
    storage: {type: Array},
    discount: {type: Number, min: 0, max: 100, default: 0}
}, {
    collection: 'products',
    timestamps: true
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
