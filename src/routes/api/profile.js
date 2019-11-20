const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@router   GET api/profile/me
//@desc     Get current users profiles
//@acces    Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this user'
            });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@router   POST api/profile
//@desc     Createor update user profile
//@acces    Private

router.post(
    '/', [
        auth, [
            check('location', 'Location is required')
            .not()
            .isEmpty(),
            check('skills', 'Skills are required')
            .not()
            .isEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            website,
            location,
            skills,
            bio,
            experience,
            youtube,
            twitter,
            facebook,
            instagram
        } = req.body;

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        console.log(profileFields.skills);

        //Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true,
                upsert: true
            });
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//@router   Get api/profile
//@desc     Get all profiles
//@acces    Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@router   Get api/profile/user/:user_id
//@desc     Get profile by ID
//@acces    Public
router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({
                msg: 'Profile not found.'
            });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile not found.'
            });
        }
        res.status(500).send('Server Error');
    }
});

//@router   Delete api/profile
//@desc     Delete profile, user & post
//@acces    Private
router.delete('/', auth, async(req, res) => {
    try {
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        //Remove users
        await User.findOneAndRemove({ user: req.user.id });

        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;