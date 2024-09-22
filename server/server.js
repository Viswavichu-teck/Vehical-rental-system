const express = require('express');
const cors = require('cors');  // Import CORS
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db');
const path = require('path');

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Node JS Server Started on Port ${port}`));
