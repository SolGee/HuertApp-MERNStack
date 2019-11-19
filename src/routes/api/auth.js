const express = require('express');

const router = express.Router();
//This will help us if we use it as a parameter to limit the routes if there is not al authentication
const auth = require('../../middleware/auth');

const User = require('../../models/User');
//@router   GET api/auth
//@desc     Test route
//@acces    Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;