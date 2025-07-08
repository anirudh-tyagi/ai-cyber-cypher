import React, { useEffect } from 'react'
import { apiClient } from '../services/apiClient'

const AutoKeyGenTest: React.FC = () => {
  useEffect(() => {
    const testKeyGeneration = async () => {
      console.log('🔧 Auto-testing key generation on mount...')
      
      try {
        // Test 1: Direct local key generation
        console.log('Test 1: Local key generation')
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
        const array = new Uint8Array(32)
        crypto.getRandomValues(array)
        const localKey = Array.from(array, byte => charset[byte % charset.length]).join('')
        console.log('✅ Local key generated:', localKey.substring(0, 8) + '...')
        
        // Test 2: API key generation
        console.log('Test 2: API key generation')
        const response = await apiClient.generateKey(32, 'random')
        console.log('✅ API key generated:', response.key.substring(0, 8) + '...')
        console.log('API response full:', response)
        
        alert(`✅ Auto-test completed!\nLocal: ${localKey}\nAPI: ${response.key}`)
        
      } catch (error) {
        console.error('❌ Auto-test failed:', error)
        alert(`❌ Auto-test failed: ${error}`)
      }
    }
    
    // Run test after 2 seconds
    setTimeout(testKeyGeneration, 2000)
  }, [])

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Auto Key Generation Test</h3>
      <p className="text-sm">This component will automatically test key generation in 2 seconds...</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Check console and wait for alert</p>
    </div>
  )
}

export default AutoKeyGenTest
