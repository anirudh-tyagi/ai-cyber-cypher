import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import { ParticlesBackground } from './components/ui'
import { CipherState } from './types/cipher'

const App: React.FC = () => {
  const [cipherState, setCipherState] = useState<CipherState>({
    inputText: '',
    outputText: '',
    key: '',
    algorithm: 'rc4',
    mode: 'encrypt',
    analysisResults: null
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden @container"
    >
      {/* Particles Background */}
      <ParticlesBackground 
        particleCount={120}
        particleColors={["#3b82f6", "#1e40af", "#3730a3"]}
        speed={0.3}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))',
            borderRadius: 'var(--radius)',
            fontSize: '0.875rem'
          }
        }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-fluid-responsive relative z-10"
      >
        <motion.div variants={itemVariants}>
          <Header />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 sm:mt-8 lg:mt-12">
          <Dashboard 
            cipherState={cipherState}
            onStateChange={setCipherState}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
