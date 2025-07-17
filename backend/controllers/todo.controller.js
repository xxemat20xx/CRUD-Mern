const Data = require('../models/data.model');

const createTodo = async (req, res) => {
    const { title , description } = req.body;
    try {
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }
        const newTodo = new Data({
            title,
            description,
            completed: false
        });
        console.log('Creating new todo:', newTodo);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getTodos = async (req, res) => {
    try {
        const todos = await Data.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Data.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error('Error fetching todo by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateTodo = async (req, res) => {};
const deleteTodo = async (req, res) => {};
const toggleTodoCompletion = async (req, res) => {};
const searchTodos = async (req, res) => {}

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion,
    searchTodos
};