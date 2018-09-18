'use strict';

// Application Dependencies
const express = require('express');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/name', (request, response) => {
  console.log('request.query:', request.query);
  console.log('request.query.name', request.query.name);

  // response.send('This is the response for the name route');
  response.send(`The user's name is ${request.query.name}`);
})

app.get('/color', (request, response) => {
  console.log(request.query);

  response.send('This is the response for the color route');
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
