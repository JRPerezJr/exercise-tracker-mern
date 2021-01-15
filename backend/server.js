//Import cors express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Import dotevn config file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//Connect to my MongoDB Atlas cluster and confirm
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas database connection established successfully!');
});

//import these files from the routes folder
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//These are my routes to hit
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Listen on port 5000 when server is running
app.listen(port, () => {
  console.log(`Server Flying High on port: ${port}`);
});
