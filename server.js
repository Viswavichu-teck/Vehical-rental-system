const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db');  // Ensure DB connection is correct
app.use(express.json());

app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

const path = require('path');

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Node JS Server Started on Port ${port}`));
