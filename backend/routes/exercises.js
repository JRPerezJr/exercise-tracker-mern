const router = require('express').Router();

//require the User model from the models folder
let Exercise = require('../models/exercise.model');

//main route
router.route('/').get((req, res) => {
    //Mongoose find method Find me a user
    Exercise.find()
        //Return a Exercise respond in json format
        .then(excercises => res.json(excercises))
        //Throw back an error message and code if there was a problem
        .catch(err => res.status(400).json('Error: ' + err));
});

//add exercise route
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(excercise => res.json(excercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').put((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;