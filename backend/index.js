require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Import the connectDB function
const connectToDB = require('./database/connectDB');

// Import routes
const todoRoutes = require('./routes/todo.routes');

// CORS setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api', todoRoutes);

app.listen(PORT, async () =>{
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
});