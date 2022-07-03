const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, minLength: 6, maxLength: 16},
    password: {type: String, required: true, minLength: 6},
    role: {type: String, required: true, default: 'basic'},
    image: {type: String, required: true, default: 'https://thumbs.dreamstime.com/b/anonymous-user-icon-person-business-suit-question-mark-internet-security-concept-vector-illustration-88848107.jpg'}
}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);