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
        res.status(500).json({success: false, message: 'Internal server error' });
    }
};
const getTodos = async (req, res) => {
    try {
        const todos = await Data.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({success: false, message: 'Internal server error' });
    }
}
const getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Data.findById(id);
        if (!todo) {
            return res.status(404).json({success: false, message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error('Error fetching todo by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const todo = await Data.findById(id);
        if(!todo){
            return res.status(404).status(404).json({ success: false, message: 'Todo not found' });
        }
        todo.title = title || todo.title; // Update title if provided
        todo.description = description || todo.description; // Update description if provided
        todo.completed = completed !== undefined ? completed : todo.completed; // Update completion status if provided

        // Save the updated todo
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);

    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Data.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, message: 'Todo deleted successfully' }); 
        await Data.deleteOne({ _id: id }); // Ensure the todo is deleted from the database
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const toggleTodoCompletion = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Data.findById(id);
        if(!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        todo.completed = !todo.completed; // Toggle the completion status
        const updatedTodo = await todo.save(); // Save the updated todo
        res.status(200).json(updatedTodo);
    } catch (error) {   
        console.error('Error toggling todo completion:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        
    }
};
const searchTodos = async (req, res) => {
    const { query } = req.query; // Get the search query from the request
    try {
        if (!query) {
            return res.status(400).json({ success: false, message: 'Search query is required' });
        }
        // Use a case-insensitive regex to search for todos by title or description
        const regex = new RegExp(query, 'i');
        const todos = await Data.find({
            $or: [
                { title: regex },
                { description: regex }
            ]
        });
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error searching todos:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }  
}

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion,
    searchTodos
};