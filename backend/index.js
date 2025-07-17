require('dotenv').config();
const express = require('express');


// Import the connectDB function
const connectToDB = require('./database/connectDB');

// Import routes
const todoRoutes = require('./routes/todo.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api', todoRoutes);

app.listen(PORT, async () =>{
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
});