import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ComingSoon from './components/ComingSoon'
import Signup from './components/Signup'

function App() {
  const [page, setPage] = useState<'home' | 'signup'>('home')

  return (
    <AnimatePresence mode="wait">
      {page === 'home' ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ComingSoon onNavigate={() => setPage('signup')} />
        </motion.div>
      ) : (
        <motion.div
          key="signup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Signup onBack={() => setPage('home')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
