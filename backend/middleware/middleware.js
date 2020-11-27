const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleWare = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.SECRET_KEY_TO_ACCESS, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { authMiddleWare };
