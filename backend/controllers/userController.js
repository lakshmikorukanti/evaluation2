const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { registerValidator, loginValidator } = require('../validation/validation');
const registerUser = async (req, res) => {
    try {
        const { error } = registerValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password, name } = req.body;
        const userExists = await User.findOne({ email });

        const encryptedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        if (userExists) {
            throw new Error('Account already exists');
        }

        const newUser = await new User({
            email,
            password: encryptedPassword,
            name
        });
        await newUser.save();

        res.json({
            message: `${name} registered Successfully`,
            email
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    console.log(req);
    try {
        const { error } = loginValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (passwordCheck) {
            const { emailDb } = user;
            const data = { email: emailDb };
            const authToken = jwt.sign(data, process.env.SECRET_KEY_TO_ACCESS);
            res.json({
                auth: email,
                error: false,
                authToken,
                user,
                message: 'Logged in successfully'
            });
        } else {
            throw new Error('Wrong password');
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = { registerUser, loginUser };
