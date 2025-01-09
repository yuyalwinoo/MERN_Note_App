const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: 'String',
        required: true,
    },
    content: {
        type: 'String',
        required: true,
    },
    backgroundColor: {
        type: 'String',
        required: true,
    },
    isPinned: {
        type: 'Boolean',
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{ timestamps: true });
module.exports = mongoose.model('Note', noteSchema);