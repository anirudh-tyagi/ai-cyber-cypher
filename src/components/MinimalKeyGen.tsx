import React, { useState } from 'react'
import { Button } from './ui/Button'

interface MinimalKeyGenProps {
  onKeyGenerated: (key: string) => void
  currentKey: string
}

const MinimalKeyGen: React.FC<MinimalKeyGenProps> = ({ onKeyGenerated, currentKey }) => {
  const [counter, setCounter] = useState(0)

  const handleGenerateKey = () => {
    // Simple key generation - guaranteed to work
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substr(2, 15)
    const newKey = `key_${timestamp}_${random}`
    
    console.log('Generated key:', newKey)
    onKeyGenerated(newKey)
    setCounter(c => c + 1)
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Minimal Key Generator</h2>
      
      <Button
        onClick={handleGenerateKey}
        className="w-full mb-4"
        size="lg"
      >
        Generate New Key (Clicked: {counter} times)
      </Button>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Current Key Length: {currentKey.length} characters
        </div>
        
        {currentKey && (
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm break-all">
            {currentKey}
          </div>
        )}
        
        {!currentKey && (
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-500">
            No key generated yet
          </div>
        )}
      </div>
    </div>
  )
}

export default MinimalKeyGen
