import { motion as Motion } from 'framer-motion'
import Sidenav from './components/Sidenav'
import Content from './components/Content'
import { Toaster } from 'react-hot-toast'

function App() {
  return (  
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='flex min-h-screen bg-gray-900'
    >
      <Sidenav />
      <Content />
      <Toaster />
    </Motion.div>
  )
}

export default App;
