import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Unlock, RefreshCw, Copy, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { CipherState } from '../types/cipher'
import { createCipher, CIPHER_ALGORITHMS } from '../utils/cipherAlgorithms'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { Badge } from './ui/Badge'

interface CipherEngineProps {
  cipherState: CipherState
  onStateChange: (state: CipherState) => void
}

const CipherEngine: React.FC<CipherEngineProps> = ({ cipherState, onStateChange }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showKey, setShowKey] = useState(false)

  const handleInputChange = (field: keyof CipherState, value: string) => {
    onStateChange({
      ...cipherState,
      [field]: value
    })
  }

  const processCipher = async () => {
    if (!cipherState.inputText.trim()) {
      toast.error('Please enter text to process')
      return
    }
    
    if (!cipherState.key.trim()) {
      toast.error('Please enter a key')
      return
    }

    setIsProcessing(true)
    
    try {
      const cipher = createCipher(cipherState.algorithm, cipherState.key)
      let result: string
      
      if (cipherState.mode === 'encrypt') {
        result = cipher.encrypt(cipherState.inputText)
        // Convert to hex for display
        result = Array.from(result, char => 
          char.charCodeAt(0).toString(16).padStart(2, '0')
        ).join('')
        toast.success('Text encrypted successfully!', { icon: '🔒' })
      } else {
        // Convert from hex back to string
        const hexPairs = cipherState.inputText.match(/.{1,2}/g) || []
        const binaryString = hexPairs.map(hex => 
          String.fromCharCode(parseInt(hex, 16))
        ).join('')
        result = cipher.decrypt(binaryString)
        toast.success('Text decrypted successfully!', { icon: '🔓' })
      }
      
      onStateChange({
        ...cipherState,
        outputText: result
      })
      
    } catch (error) {
      toast.error('Cipher operation failed')
      console.error('Cipher error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!', { icon: '📋' })
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const swapInputOutput = () => {
    onStateChange({
      ...cipherState,
      inputText: cipherState.outputText,
      outputText: cipherState.inputText,
      mode: cipherState.mode === 'encrypt' ? 'decrypt' : 'encrypt'
    })
    toast.success('Input and output swapped!', { icon: '🔄' })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Cipher Engine</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={swapInputOutput}
            className="p-2"
            title="Swap input and output"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Algorithm</label>
            <Select
              value={cipherState.algorithm}
              onChange={(e) => handleInputChange('algorithm', e.target.value)}
            >
              {Object.values(CIPHER_ALGORITHMS).map(alg => (
                <option key={alg.id} value={alg.id}>
                  {alg.name} - {alg.description}
                </option>
              ))}
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mode</label>
            <div className="flex space-x-2">
              <Button
                variant={cipherState.mode === 'encrypt' ? 'default' : 'outline'}
                onClick={() => handleInputChange('mode', 'encrypt')}
                className="flex-1"
              >
                <Lock className="w-4 h-4 mr-2" />
                Encrypt
              </Button>
              <Button
                variant={cipherState.mode === 'decrypt' ? 'default' : 'outline'}
                onClick={() => handleInputChange('mode', 'decrypt')}
                className="flex-1"
              >
                <Unlock className="w-4 h-4 mr-2" />
                Decrypt
              </Button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Encryption Key</label>
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              value={cipherState.key}
              onChange={(e) => handleInputChange('key', e.target.value)}
              placeholder="Enter your encryption key..."
              className="pr-10"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Input Text {cipherState.mode === 'decrypt' && <Badge variant="outline">(Hex format)</Badge>}
          </label>
          <div className="relative">
            <textarea
              value={cipherState.inputText}
              onChange={(e) => handleInputChange('inputText', e.target.value)}
              placeholder={
                cipherState.mode === 'encrypt' 
                  ? "Enter text to encrypt..."
                  : "Enter hex-encoded ciphertext to decrypt..."
              }
              className="w-full h-32 resize-none px-3 py-2 border border-border rounded-md bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            {cipherState.inputText && (
              <button
                onClick={() => copyToClipboard(cipherState.inputText)}
                className="absolute top-3 right-3 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Copy input"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Length: {cipherState.inputText.length} characters
          </div>
        </div>

        <Button
          onClick={processCipher}
          disabled={isProcessing || !cipherState.inputText.trim() || !cipherState.key.trim()}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              {cipherState.mode === 'encrypt' ? (
                <Lock className="w-4 h-4 mr-2" />
              ) : (
                <Unlock className="w-4 h-4 mr-2" />
              )}
              {cipherState.mode === 'encrypt' ? 'Encrypt' : 'Decrypt'} Text
            </>
          )}
        </Button>

        {cipherState.outputText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-foreground">
              Output {cipherState.mode === 'encrypt' && <Badge variant="outline">(Hex format)</Badge>}
            </label>
            <div className="relative">
              <div className="h-32 overflow-y-auto p-3 bg-muted/50 rounded-md border border-border font-mono text-sm">
                {cipherState.outputText}
              </div>
              <button
                onClick={() => copyToClipboard(cipherState.outputText)}
                className="absolute top-3 right-3 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Copy output"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-muted-foreground">
              Length: {cipherState.outputText.length} characters
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default CipherEngine
