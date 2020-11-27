const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { authMiddleWare } = require('../middleware/middleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(authMiddleWare);

module.exports = router;
