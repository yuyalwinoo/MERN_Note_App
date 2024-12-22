const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: 'String',
        required: true,
        trim: true,
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    }
},{ timestamps: true });
module.exports = mongoose.model('User', userSchema);