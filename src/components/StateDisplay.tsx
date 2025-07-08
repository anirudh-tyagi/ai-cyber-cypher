import React from 'react'
import { CipherState } from '../types/cipher'

interface StateDisplayProps {
  cipherState: CipherState
}

const StateDisplay: React.FC<StateDisplayProps> = ({ cipherState }) => {
  return (
    <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Current State Debug</h3>
      <div className="space-y-2 text-sm font-mono">
        <div>
          <strong>Key:</strong> {cipherState.key || '(empty)'}
        </div>
        <div>
          <strong>Key Length:</strong> {cipherState.key.length} chars
        </div>
        <div>
          <strong>Algorithm:</strong> {cipherState.algorithm}
        </div>
        <div>
          <strong>Mode:</strong> {cipherState.mode}
        </div>
        <div>
          <strong>Input Text:</strong> {cipherState.inputText || '(empty)'}
        </div>
        <div>
          <strong>Output Text:</strong> {cipherState.outputText || '(empty)'}
        </div>
        <div>
          <strong>Has Analysis:</strong> {cipherState.analysisResults ? 'Yes' : 'No'}
        </div>
      </div>
    </div>
  )
}

export default StateDisplay
