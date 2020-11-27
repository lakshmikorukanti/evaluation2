const { array } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 4
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        data: {
            type: Array
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('User', UserSchema);
