const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, minLength: 6, maxLength: 16},
    password: {type: String, required: true, minLength: 6},
    role: {type: String, required: true, default: 'basic'},
    image: {type: String, required: true, default: 'https://res.cloudinary.com/manga-dev/image/upload/v1658737930/my-uploads/anoymousUser_hmpihv.png'},
    notifications: { type: Array }
}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);