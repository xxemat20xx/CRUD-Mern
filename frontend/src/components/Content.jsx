import React, { useEffect, useState } from 'react'
import { useTodoStore } from '../dataStore/dataStore';
import { Loader, Trash, Pen } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Sidenav from './Sidenav';
import Modal from './Modal';
import Form from './Form';
const Content = () => {

  const { todos,
          isLoading, 
          error, 
          deleteTodo, 
          fetchTodos,
          updateTodo,
          createTodo} = useTodoStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTodos();
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchData();
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

  //handle delete
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  }

  // handle edit task
  const handleOpenEditModal = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  }
  //handle add task modal
  const handleAddTaskModal = () => {
    setSelectedTodo(null);
    setIsModalOpen(true);
  }
  

  // handle submit for edit and create
  const handleFormSubmit = async ({title, description, _id}) => {
    try {
      if (_id) {
        // Update existing task
        await updateTodo(_id, { title, description });
        toast.success("Task updated successfully!");
      } else {
        // Create new task
        await createTodo(title, description);
        toast.success("Task created successfully!");
      }
      setIsModalOpen(false);
      setSelectedTodo(null);
      await fetchTodos(); // Refresh the todo list after adding/updating
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit task. Please try again.");
    }
  }

    //handle status change
  const handleStatusChange = async (id, completed) => {
    try {
      await updateTodo(id, { completed });
      toast.success(`Task marked as ${completed ? 'completed' : 'pending'}!`);
    }
    catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  }
  return (
    <main className='ml-64 position-relative p-8 bg-gray-900 flex-1'>

      <Sidenav onAddTaskClick={handleAddTaskModal} />

      {/* if no todos */}
      {todos.length === 0 && (
        <div className='text-left text-white font-bold mt-20'>
          <p className='text-lg'>No tasks available. Click "Add Task" to create one.</p>
        </div>
        )}

       {todos.map(todo => (
        <div key={todo._id} className='bg-gray-800 p-4 mb-4 rounded-lg shadow-lg'>
          <h3 className='text-white text-4xl font-bold'>{todo.title}</h3>
          <p className='text-gray-400'>{todo.description}</p>
          <p className='text-gray-500 text-sm'>Created at: {new Date(todo.createdAt).toLocaleDateString()}</p>
          <p className='text-gray-500 text-sm'>Status:{' '} <button onClick={() => handleStatusChange(todo._id, !todo.completed)}
              className={`underline ${todo.completed ? 'text-green-400' : 'text-yellow-400'} hover:text-white cursor-pointer`}>
    {todo.completed ? 'Completed' : 'Pending'}
  </button>
</p>

          
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
      {isModalOpen && 
        <Modal onClose={() => setIsModalOpen(false)}>
          <Form 
            initialData={selectedTodo} 
            onSubmit={handleFormSubmit} 
            onClose={() => setIsModalOpen(false)} 
          />
        </Modal>
      }
    </main>
  )
}

export default Content