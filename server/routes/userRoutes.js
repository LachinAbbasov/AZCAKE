const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const { registerUser, loginUser } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password');  // Exclude 'password' field
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/users/:id',authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/users/:id',authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
