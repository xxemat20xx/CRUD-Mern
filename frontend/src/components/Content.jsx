import React, { useEffect } from 'react'
import { useTodoStore } from '../dataStore/dataStore';
import { Loader, Trash, Pen } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
const Content = () => {

  const { todos, isLoading, error, deleteTodo} = useTodoStore();
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        await useTodoStore.getState().fetchTodos(); 
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);
  if (isLoading) {
    return (
      <div className="ml-64 flex items-center justify-center h-full">
        <Loader className="animate-spin size-8 text-green-500" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="ml-64 p-8 text-red-500 text-center">
        <p>Error: {error}</p>
      </div>
    );
  }
  if (todos.length === 0) {
    return (
      <div className="ml-64 p-8 text-gray-500 text-center">
        <p className='text-white font-extrabold text-3xl'>No tasks available. Please add a task.</p>
      </div>
    );
  }

  //handle delete
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  }

  // handle edit task
  const handleOpenEditModal = (todo) => {
    // Logic to open edit modal with todo data
    console.log("Open edit modal for:", todo);
  }
  return (
    <main className='ml-64 position-relative p-8 bg-gray-900 flex-1'>
       {todos.map(todo => (
        <div key={todo._id} className='bg-gray-800 p-4 mb-4 rounded-lg shadow-lg'>
          <h3 className='text-white text-xl font-bold'>{todo.title}</h3>
          <p className='text-gray-400'>{todo.description}</p>
          <p className='text-gray-500 text-sm'>Created at: {new Date(todo.createdAt).toLocaleDateString()}</p>
          <p className='text-gray-500 text-sm'>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
          
               {/* Delete Btn */}
                <Motion.button
                className='mt-5 mr-3 py-3 px-4 bg-gradient-to-r 
                    from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 
                    hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    disabled={isLoading}
                    onClick={() => handleDelete(todo._id)}
                >
                    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/>: <Trash className='w-5 h-5' />}
                </Motion.button>
              {/* Edit btn */}
              <Motion.button
                className='mt-5 py-3 px-4 bg-gradient-to-r 
                    from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 
                    hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    disabled={isLoading}
                    onClick={() => handleOpenEditModal(todo)}
                >
                    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/>: <Pen className='w-5 h-5' />}
                </Motion.button>
        </div>
      ))}
    </main>
  )
}

export default Content