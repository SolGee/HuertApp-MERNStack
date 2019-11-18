const express = require('express');

const router = express.Router();


//@router   GET api/profile
//@desc     Test route
//@acces    Public
router.get('/', (req, res) => {
    res.send('Profile Route')
});

module.exports = router;