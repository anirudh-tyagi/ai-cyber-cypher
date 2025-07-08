import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Zap } from 'lucide-react'
import { Badge } from './ui/Badge'
import { DecryptedText } from './ui'

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center py-6 sm:py-8 lg:py-12 relative z-10"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex items-center justify-center mb-4 sm:mb-6 flex-wrap"
      >
        <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-2 sm:mr-4" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          <DecryptedText 
            text="CyberCipher" 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
            interval={30}
            revealDuration={1500}
          />
        </h1>
        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-primary ml-2 sm:ml-4" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center justify-center space-x-3 mb-4 sm:mb-6 px-4"
      >
        <Badge variant="outline" className="flex items-center space-x-1 text-xs sm:text-sm">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
          <DecryptedText 
            text="Advanced Stream Cipher Analysis Platform"
            className="text-xs sm:text-sm hidden sm:inline"
            interval={20}
            revealDuration={2000}
          />
          <DecryptedText 
            text="Cipher Analysis"
            className="text-xs sm:hidden"
            interval={20}
            revealDuration={1500}
          />
        </Badge>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4"
      >
        Professional-grade cryptographic analysis with quantum-safe key generation, 
        real-time security assessment, and comprehensive visualization tools.
      </motion.p>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="w-16 sm:w-24 h-0.5 bg-primary mx-auto mt-6 sm:mt-8 rounded-full"
      />
    </motion.header>
  )
}

export default Header
