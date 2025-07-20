import React from 'react'
import { Link } from 'react-router-dom'
import { Loader, NotebookPenIcon } from 'lucide-react'
import { motion as Motion } from 'framer-motion'


const Sidenav = ({onAddTaskClick}) => {
    
   const isLoading = false; // Replace with actual loading state from your store or component state
 
  return (
    <nav className='fixed top-0 left-0 bg-gray-100 min-h-screen w-64 p-4 shadow-lg flex flex-col items-center'>
        <div className="nav-logo flex flex-col items-center mb-8">
                <NotebookPenIcon className="w-24 h-24 mx-auto m-4 text-red-600" />
                <h1 className="font-bold text-lg">MERN-Todo App</h1>
        </div>
        <ul className='flex flex-col items-center mt-8 space-y-4'>
            <li>
                <Motion.button
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r 
                    from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 
                    hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    focus:ring-offset-gray-600 transition duration-200 cursor-pointer'
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    disabled={isLoading}
                    onClick={onAddTaskClick}
                >
                    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/>: "Add ToDo"}
                </Motion.button>
            </li>
        </ul>

    </nav>
  )
}

export default Sidenav