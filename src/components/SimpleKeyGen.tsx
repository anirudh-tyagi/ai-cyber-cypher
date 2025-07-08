import React, { useState } from 'react'
import { Button } from './ui/Button'

interface SimpleKeyGenProps {
  onKeyGenerated: (key: string) => void
  currentKey: string
}

const SimpleKeyGen: React.FC<SimpleKeyGenProps> = ({ onKeyGenerated, currentKey }) => {
  const [counter, setCounter] = useState(0)

  const generateSimpleKey = () => {
    console.log('🔧 Simple key generation clicked!')
    const newKey = `test-key-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log('🔑 Generated simple key:', newKey)
    console.log('🔄 Calling onKeyGenerated with:', newKey)
    onKeyGenerated(newKey)
    console.log('✅ onKeyGenerated called successfully')
    setCounter(c => c + 1)
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Simple Key Generator Test</h3>
      
      <Button
        onClick={generateSimpleKey}
        className="w-full mb-4"
        size="lg"
      >
        Generate Test Key (Clicked: {counter})
      </Button>
      
      {currentKey && (
        <div className="p-3 bg-black text-green-400 rounded text-sm font-mono break-all">
          Current Key: {currentKey}
        </div>
      )}
    </div>
  )
}

export default SimpleKeyGen
