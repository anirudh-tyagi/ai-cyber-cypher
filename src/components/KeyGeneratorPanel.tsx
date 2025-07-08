import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Key, Shield, Zap, Lock, Copy, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { KeyGenerationOptions } from '../types/cipher'
import { Card, CardHeader, CardContent, Button, Select, Input, Progress, Badge, StatCard } from './ui'
import { apiClient } from '../services/apiClient'

interface KeyGeneratorProps {
  onKeyGenerated: (key: string) => void
  currentKey: string
}

const KeyGeneratorPanel: React.FC<KeyGeneratorProps> = ({ onKeyGenerated, currentKey }) => {
  const [options, setOptions] = useState<KeyGenerationOptions>({
    length: 32,
    type: 'random',
    entropy: 256,
    includeSymbols: true,
    quantumSafe: true
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [keyStrength, setKeyStrength] = useState<number>(0)

  const generateKey = useCallback(async () => {
    setIsGenerating(true)
    
    try {
      let newKey: string
      let keyStrength: number = 85

      // Try API first
      try {
        const response = await apiClient.generateKey(options.length, options.type)
        newKey = response.key
        keyStrength = response.strength || 85
        toast.success(`${options.type} key generated via API!`, { icon: '🔐' })
      } catch (apiError) {
        // Fallback to local generation
        newKey = generateLocalKey(options)
        keyStrength = analyzeKeyStrength(newKey)
        toast.success('Secure key generated locally!', { icon: '🔑' })
      }
      
      setKeyStrength(keyStrength)
      onKeyGenerated(newKey)
      
    } catch (error) {
      console.error('Key generation error:', error)
      toast.error('Failed to generate key')
    } finally {
      setIsGenerating(false)
    }
  }, [options, onKeyGenerated])

  const generateLocalKey = (opts: KeyGenerationOptions): string => {
    const charset = opts.includeSymbols 
      ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    
    const array = new Uint8Array(opts.length)
    crypto.getRandomValues(array)
    
    return Array.from(array, byte => charset[byte % charset.length]).join('')
  }

  const analyzeKeyStrength = (key: string): number => {
    if (!key) return 0
    
    let score = 0
    score += Math.min(50, key.length * 2) // Length score
    score += /[a-z]/.test(key) ? 10 : 0 // Lowercase
    score += /[A-Z]/.test(key) ? 10 : 0 // Uppercase
    score += /[0-9]/.test(key) ? 10 : 0 // Numbers
    score += /[^a-zA-Z0-9]/.test(key) ? 20 : 0 // Special chars
    
    return Math.min(100, score)
  }

  const copyKey = async () => {
    if (!currentKey) return
    try {
      await navigator.clipboard.writeText(currentKey)
      toast.success('Key copied to clipboard!', { icon: '📋' })
    } catch (error) {
      console.error('Failed to copy key:', error)
      toast.error('Failed to copy key')
    }
  }

  const getStrengthLabel = (strength: number) => {
    if (strength >= 90) return 'Quantum-Resistant'
    if (strength >= 70) return 'Very Strong'
    if (strength >= 50) return 'Strong'
    if (strength >= 30) return 'Moderate'
    return 'Weak'
  }

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-green-500'
    if (strength >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Advanced Key Generator</h2>
            </div>
            <Badge variant="outline">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Key Type Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Key Type</label>
            <Select
              value={options.type}
              onChange={(e) => setOptions(prev => ({ ...prev, type: e.target.value as any }))}
            >
              <option value="random">🎲 Cryptographically Random</option>
              <option value="quantum">🔐 Quantum-Safe</option>
              <option value="neural">🧠 AI-Enhanced</option>
            </Select>
          </div>

          {/* Length and Entropy */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Length</label>
              <Input
                type="number"
                min="8"
                max="512"
                value={options.length}
                onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Entropy</label>
              <Select
                value={options.entropy}
                onChange={(e) => setOptions(prev => ({ ...prev, entropy: parseInt(e.target.value) }))}
              >
                <option value="128">128-bit</option>
                <option value="256">256-bit</option>
                <option value="512">512-bit</option>
              </Select>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) => setOptions(prev => ({ ...prev, includeSymbols: e.target.checked }))}
                className="rounded border-border"
              />
              <span className="text-sm text-foreground">Include Symbols</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.quantumSafe}
                onChange={(e) => setOptions(prev => ({ ...prev, quantumSafe: e.target.checked }))}
                className="rounded border-border"
              />
              <span className="text-sm text-foreground">Quantum-Safe</span>
            </label>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateKey}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Key
              </>
            )}
          </Button>

          {/* Generated Key Display */}
          {currentKey && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Generated Key</label>
                <div className="flex items-center space-x-2">
                  {keyStrength > 0 && (
                    <Badge variant={keyStrength >= 80 ? 'default' : keyStrength >= 60 ? 'secondary' : 'destructive'}>
                      <Lock className="w-3 h-3 mr-1" />
                      {getStrengthLabel(keyStrength)}
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyKey}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md border border-border font-mono text-sm break-all">
                {currentKey}
              </div>
              
              {keyStrength > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Strength Analysis</span>
                    <span className={`text-sm font-medium ${getStrengthColor(keyStrength)}`}>
                      {keyStrength}%
                    </span>
                  </div>
                  <Progress 
                    value={keyStrength} 
                    className="w-full"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StatCard
                      title="Security Rating"
                      value={getStrengthLabel(keyStrength)}
                      icon={Shield}
                      className={getStrengthColor(keyStrength)}
                    />
                    <StatCard
                      title="Key Length"
                      value={`${currentKey.length} chars`}
                      icon={Key}
                      description="Character count"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default KeyGeneratorPanel
