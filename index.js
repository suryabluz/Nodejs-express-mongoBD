const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersController = require('./usersController');
app.use('/api', usersController);

app.listen(port, (error) => {
  if (error) console.log(error);
  console.log('Server connected on PORT ', port);
});
