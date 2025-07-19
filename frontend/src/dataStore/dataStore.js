import axios from 'axios';
import { create } from 'zustand';

const API_URL = 'http://localhost:3000/api/todos';

export const useTodoStore = create((set) => ({
    todos: [],
    isLoading: false,
    error: null,
    createTodo: async (title, description) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(API_URL, { title, description });
            set((state) => ({
                todos: [...state.todos, response.data],
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.response.data.message || "Error creating todo", isLoading: false });
            throw error;
        }
    },
    fetchTodos: async () => {
        set({isLoading: true, error: null });
        try {
            const response = await axios.get(API_URL);
            set({ todos: response.data, isLoading: false });    
        } catch (error) {
            set({ error: error.response.data.message || "Error fetching todos", isLoading: false });
            throw error;
        }
    },
    deleteTodo: async(id) => {
        set({isLoading: true, error: null });
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            set((state) => ({isLoading: false, todos: state.todos.filter(todo => todo._id !== id) }));
            return response.data; // Return the deleted todo data if needed
        } catch (error) {
            set({ error: error.response.data.message || "Error deleting todo", isLoading: false });
            throw error;
        }
    },
    updateTodo: async(id, updates) => {
        set({isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/${id}`, updates);
            set((state) => ({
                todos: state.todos.map(todo => todo._id === id ? response.data : todo),
                isLoading: false,
            }));
            return response.data; // Return the updated todo data if needed
        } catch (error) {
            set({ error: error.response.data.message || "Error updating todo", isLoading: false });
            throw error;
        }
    }
}))