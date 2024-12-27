// Check stage = Production | Development
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Default dependencies
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

// Relative dependencies
const indexRoutes = require('./controllers/index.js');

const app = express(); // Initialize express app

// Express setup section
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// Mongoose setup section
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connected'));

// Use router paths
app.use('/', indexRoutes);

// Start listening server on specified port
app.listen(process.env.PORT || 8080, () => {
	console.log(`App listening in http://localhost:${process.env.PORT || 8080}`);
});
