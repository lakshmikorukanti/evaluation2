const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const Employee = require('./models/employee');
const employeeData = require('./mockdata/data');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();
const db = mongoose.connection;

app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res, req) => {
        if (err) {
            console.log(err);
        } else {
            console.log('The database is connected');
        }
    }
);
db.once('open', async (req, res) => {
    if ((await Employee.countDocuments().exec()) > 0) {
        console.log('Employee Data already added in the collection');
        return;
    }

    Employee.insertMany(employeeData)
        .then(() => console.log('Employee Data collections added Successfully'))
        .catch((err) => console.log(`Error : ${err}`));
});
app.use('/user', userRoutes);
app.use('/api', employeeRoutes);
const port = 5000;

app.listen(port, () => {
    console.log('The server is up and running on port ' + port);
});
