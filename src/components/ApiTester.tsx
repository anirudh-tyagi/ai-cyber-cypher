import React, { useState } from 'react'
import { apiClient } from '../services/apiClient'

const ApiTester: React.FC = () => {
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testDirectFetch = async () => {
    setIsLoading(true)
    setResult('Testing direct fetch...')
    
    try {
      console.log('Testing direct fetch to backend...')
      const response = await fetch('http://localhost:8001/health')
      console.log('Direct fetch response:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Direct fetch data:', data)
      setResult(`Direct Fetch Success: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      console.error('Direct fetch failed:', error)
      setResult(`Direct Fetch Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testKeyGeneration = async () => {
    setIsLoading(true)
    setResult('Testing...')
    
    try {
      console.log('Starting API test...')
      const response = await apiClient.generateKey(32, 'random')
      console.log('API test successful:', response)
      setResult(`Success! Key: ${response.key}\nStrength: ${response.strength}`)
    } catch (error) {
      console.error('API test failed:', error)
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testHealthCheck = async () => {
    setIsLoading(true)
    setResult('Testing health...')
    
    try {
      console.log('Starting health check...')
      const response = await apiClient.healthCheck()
      console.log('Health check successful:', response)
      setResult(`Health: ${JSON.stringify(response, null, 2)}`)
    } catch (error) {
      console.error('Health check failed:', error)
      setResult(`Health Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4">API Tester</h3>
      
      <div className="space-x-2 mb-4">
        <button 
          onClick={testDirectFetch}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Direct Fetch
        </button>
        <button 
          onClick={testHealthCheck}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Health
        </button>
        <button 
          onClick={testKeyGeneration}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Key Gen
        </button>
      </div>
      
      <pre className="bg-black text-green-400 p-3 rounded text-sm whitespace-pre-wrap">
        {result || 'Click a button to test...'}
      </pre>
    </div>
  )
}

export default ApiTester
