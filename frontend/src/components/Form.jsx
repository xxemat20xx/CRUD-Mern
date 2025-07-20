import React from 'react'
import { useState } from 'react'
import Input from './Input';
import { motion as Motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useTodoStore } from '../dataStore/dataStore';
import { toast } from 'react-hot-toast';
const Form = ({ onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');

  const { isLoading } = useTodoStore();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await onSubmit({ title, description, _id:initialData ? initialData._id : null });
      console.log("Form submitted successfully");
      onClose(); 
      setTitle('');
      setDescription('');

    } catch (error)   {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit task. Please try again.");
    }
  }
  return (
  
    <form onSubmit={handleSubmit} className='p-6'>
      <h2 className='text-2xl text-white font-bold mb-4'>
        {initialData ? 'Edit Task' : 'What to do?'}
      </h2>
      
      <Input
        type='text'
        placeholder='Task Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className='mb-4'
      />
      <textarea
        placeholder='Task Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className='w-full p-2 rounded-lg bg-gray-700 text-white focus:outline
        focus:ring-2 focus:ring-green-500'
        rows='4'
      ></textarea>
      <Motion.button
        type='submit'
        className='mt-5 w-full py-3 px-4 bg-gradient-to-r 
          from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 
          hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : (initialData ? 'Update Task' : 'Add Task')}
      </Motion.button>

    </form> 
  )
}

export default Form