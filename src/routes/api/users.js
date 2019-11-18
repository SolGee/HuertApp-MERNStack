const express = require('express');

const router = express.Router();


//@router   GET api/users
//@desc     Test route
//@acces    Public
router.get('/', (req, res) => {
    res.send('User Route')
});

module.exports = router;