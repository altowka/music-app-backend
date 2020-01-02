const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi); //to trochę zapomniałam po co było
const mongoose = require('mongoose');

const songs = require('./routes/songs');
const users = require('./routes/users');

const express = require('express');
const app = express(); //tworzę nową aplikację we framweorku express


mongoose.connect('mongodb://localhost/vidly') //to po to żeby się nie czepiało, ze zła wersja mongoose
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/songs', songs);
app.use('/api/users', users);


//konfiguracja serwera, nasłychiwanie. Pierwszy argument to port, na którym aplikacja ma nasłuchiwać. Drugi argument to collback, który ma zastać odpalony w momencie rozpoczęcia nasłuchiwania
const port = process.env.PORT || 3000; //jeżeli nie określimy zmiennej średowoskowej PORT to port będzie równy 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
//Polecenie node index.js(może to być inna nazwa niż index) uruchamiamy nasz serwer