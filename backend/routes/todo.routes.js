const express = require('express');

// import controller functions
const {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion,
    searchTodos
} = require('../controllers/todo.controller');

// router
const router = express.Router();

// define routes
router.get('/todos/search', searchTodos);// Search todos by title or description
router.post('/todos', createTodo); // Create a new todo
router.get('/todos', getTodos);  // Get all todos
router.get('/todos/:id', getTodoById); // Get a single todo by ID
router.put('/todos/:id', updateTodo); // Update a todo by ID
router.delete('/todos/:id', deleteTodo); // Delete a todo by ID
router.patch('/todos/:id/toggle', toggleTodoCompletion); // Toggle completion status of a todo


module.exports = router;