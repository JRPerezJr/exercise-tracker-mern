const router = require('express').Router();

//require the User model from the models folder
let User = require('../models/user.model');

//main route
router.route('/').get((req, res) => {
    //Mongoose find method Find me a user
    User.find()
        //Return a Users respond in json format
        .then(users => res.json(users))
        //Throw back an error message and code if there was a problem
        .catch(err => res.status(400).json('Error: ' + err));
});

//add user route
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({
        username
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;