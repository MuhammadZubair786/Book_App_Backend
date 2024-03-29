const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors=require("cors");
const mainRoute = require('./Route/mainRouter.js');

const dbURI = process.env.DB_URI;


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(dbURI);

const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;

// Event handling for database connection
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(mainRoute);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

