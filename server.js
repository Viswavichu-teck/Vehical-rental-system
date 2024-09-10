const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db');
app.use(express.json());

app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

const path = require('path');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/users/register', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
const cors = require('cors');
app.use(cors({
  origin: 'https://comfy-duckanoo-4c95de.netlify.app', // Your Netlify URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
