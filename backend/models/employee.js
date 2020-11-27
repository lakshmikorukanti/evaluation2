const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        joining_date: {
            type: String,
            required: true
        },
        payment: [
            {
                amount: Number,
                mode: String
            }
        ]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('employee', employeeSchema);
