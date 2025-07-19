import { motion as Motion } from 'framer-motion'
import Input from './components/Input'
import Sidenav from './components/Sidenav'
import Content from './components/Content'
import { useState } from 'react'
import Modal from './components/Modal'
import AddTaskForm from './components/AddTaskForm'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  return (  
    <Motion.div
      
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='flex min-h-screen bg-gray-900'
    >
      <Sidenav onAddTaskClick={handleOpenModal}/>
      <Content />

      {isModalOpen && 
        <Modal onClose={handleCloseModal}>
            <AddTaskForm onClose={handleCloseModal} />
        </Modal>}
    </Motion.div>
  )
}

export default App
