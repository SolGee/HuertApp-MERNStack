const express = require('express');
const router = express.Router();
//If the user has already a photo in its mail, this allow us to grab it
const gravatar = require('gravatar');
//This allow us to encryot the user password
const bcrypt = require('bcryptjs');
const {
    check,
    validationResult
} = require('express-validator/check');

const User = require('../../models/User');

//@router   POST api/users
//@desc     Test route
//@acces    Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //Destructuring

    const {
        name,
        email,
        password
    } = req.body;

    try {
        //See if user exist
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exist.'
                }]
            })
        }
        //Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200', //size
            r: 'pg', //not naked avatars, lol
            d: 'mm' // a dafault icon if the user hasn't a photo uploaded
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
        //Encrypt password

        //salt : With "salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        //Return jsonwebtoken
        res.send('User registered')

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;