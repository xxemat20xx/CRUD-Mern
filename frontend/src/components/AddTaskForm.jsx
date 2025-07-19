import React from 'react'
import { useState } from 'react'
import Input from './Input';
import { motion as Motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useTodoStore } from '../dataStore/dataStore';

const AddTaskForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { createTodo, isLoading } = useTodoStore();

  const handleAddTask = async(e) => {
    e.preventDefault();
    if(!title || !description) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await createTodo(title, description);
      setTitle('');
      setDescription('');
      alert("Task added successfully!");

      //close modal after adding task
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  }
  return (
  
    <form onSubmit={handleAddTask} className='p-6'>
      <h2 className='text-2xl text-white font-bold text-gray-900 mb-4'>What to do?</h2>
        <Input
          icon={() => <svg xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"/>
          </svg>}
          placeholder="Task Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-4 p-2 bg-gray-300 bg-opacity-50 rounded-lg border border-gray-700
          focus:border-green-500 focus:ring-2 focus:ring-green-500  placeholder-gray-400 transition duration-200"
          rows="4"
          required
        />

        {/* button */}
                <Motion.button
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r 
                    from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 
                    hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    disabled={isLoading}
                    type='submit'
                >
                    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/>: "Submit Task"}
                </Motion.button>
    </form> 
  )
}

export default AddTaskForm