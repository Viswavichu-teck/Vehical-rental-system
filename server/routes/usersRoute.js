const express = require('express');
const router = express.Router();
const User = require('./userModel'); // Adjust the path as necessary

// Registration Route
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body; // Include role in the request body

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password, role }); // Set role in the user object
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user && await user.comparePassword(password)) {
            // Send back user data including role
            res.send({
                username: user.username,
                role: user.role,
                // add other fields if necessary
            });
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
