const Employee = require('../models/employee');

const getEmployeeDetails = async (req, res, next) => {
    let { gender, date, name } = req.query;
    console.log(gender, date, name, req.query);

    console.log(gender, date, name, req.query.page);
    const limit = Number(req.query.limit);
    let page = 1;
    if (req.query.name == '') {
        page = Number(req.query.page);
    }
    let sortByDate = date == 'asc' ? 1 : date == 'desc' ? -1 : 0;
    if (gender != '' && name == '') {
        const employeeDataCount = await Employee.countDocuments(
            {
                gender: { $regex: gender }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(employeeDataCount / limit);
        try {
            const results = await Employee.find({
                gender: { $regex: gender }
            })
                .sort({ joining_date: sortByDate })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (gender == '' && name != '') {
        const employeeDataCount = await Employee.countDocuments(
            {
                name: { $regex: name }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(employeeDataCount / limit);
        try {
            const results = await Employee.find({
                name: { $regex: name }
            })
                .sort({ joining_date: sortByDate })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (name != '' && gender != '') {
        const employeeDataCount = await Employee.countDocuments(
            {
                name: { $regex: name },
                gender: { $regex: gender }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(employeeDataCount / limit);
        try {
            const results = await Employee.find({
                name: { $regex: name },
                gender: { $regex: gender }
            })
                .sort({ joining_date: sortByDate })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else {
        const employeeDataCount = await Employee.countDocuments({}, (err) => {
            if (err) console.log(err);
        });
        const finalPage = Math.ceil(employeeDataCount / limit);
        try {
            const results = await Employee.find({ gender: { $regex: gender } })
                .sort({ joining_date: sortByDate })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    }
};

module.exports = { getEmployeeDetails };
