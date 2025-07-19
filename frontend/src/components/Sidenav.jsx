import React from 'react'
import { Link } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
const Sidenav = ({onAddTaskClick}) => {
    
   const isLoading = false; // Replace with actual loading state from your store or component state

  return (
    <nav className='fixed top-0 left-0 bg-gray-100 min-h-screen w-64 p-4 shadow-lg flex flex-col items-center'>
        <div className="nav-logo flex flex-col items-center mb-8">
            <img src="/logo.png" alt="Logo" className='w-24 mx-auto m-4' />
            <p><strong>MERN-Todo App</strong></p>
        </div>
        <ul className='flex flex-col items-center mt-8 space-y-4'>
            <li>
                <Motion.button
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r 
                    from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 
                    hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
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