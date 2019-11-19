const express = require('express');

const router = express.Router();
//This will help us if we use it as a parameter to limit the routes if there is not al authentication
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');

//JWT will return an auth token to the users
const jwt = require('jsonwebtoken');
//Module that looks for the global variables
const config = require('config');
//Express-validator validates that the values agree with the params required
const {
    check,
    validationResult
} = require('express-validator/check');


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

//@router   POST api/auth
//@desc     Authenticate user and get token 
//@acces    Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //Destructuring

    const {

        email,
        password
    } = req.body;

    try {
        //See if user exist
        let user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials.'
                }]
            })
        }

        //Match user & password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials.'
                }]
            });
        }

        //Return jsonwebtoken
        const payLoad = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payLoad,
            config.get('jwtSecret'), {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        token
                    })
                }

            })


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;