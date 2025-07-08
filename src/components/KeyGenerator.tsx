import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Key, Shield, Zap, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { KeyGenerationOptions } from '../types/cipher'
import { generateQuantumSafeKey, generateNeuralKey, analyzeKeyStrength } from '../utils/keyGeneration'
import { Card, CardHeader, CardContent, Button, Select, Input, Progress, Badge, StatCard, DecryptedText } from './ui'

interface KeyGeneratorProps {
  onKeyGenerated: (key: string) => void
  currentKey: string
}

const KeyGenerator: React.FC<KeyGeneratorProps> = ({ onKeyGenerated, currentKey }) => {
  const [options, setOptions] = useState<KeyGenerationOptions>({
    length: 32,
    type: 'quantum',
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
      
      switch (options.type) {
        case 'quantum':
          newKey = await generateQuantumSafeKey(options)
          toast.success('Quantum-safe key generated!', { icon: '🔐' })
          break
        case 'neural':
          newKey = await generateNeuralKey(options)
          toast.success('Advanced key generated!', { icon: '🔑' })
          break
        case 'random':
          newKey = generateCryptoRandomKey(options)
          toast.success('Cryptographically secure key generated!', { icon: '🔑' })
          break
        default:
          newKey = generateCryptoRandomKey(options)
      }
      
      const strength = analyzeKeyStrength(newKey)
      setKeyStrength(strength)
      onKeyGenerated(newKey)
      
    } catch (error) {
      toast.error('Failed to generate key')
      console.error('Key generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [options, onKeyGenerated])

  const generateCryptoRandomKey = (opts: KeyGenerationOptions): string => {
    const charset = opts.includeSymbols 
      ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    
    const array = new Uint8Array(opts.length)
    crypto.getRandomValues(array)
    
    return Array.from(array, byte => charset[byte % charset.length]).join('')
  }

  const getStrengthLabel = (strength: number) => {
    if (strength >= 90) return 'Quantum-Resistant'
    if (strength >= 70) return 'Very Strong'
    if (strength >= 50) return 'Strong'
    if (strength >= 30) return 'Moderate'
    return 'Weak'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                <DecryptedText 
                  text="Key Generator"
                  className="text-xl font-semibold text-foreground"
                  interval={45}
                  revealDuration={1100}
                />
              </h2>
            </div>
            <Badge variant="outline">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Key Type</label>
          <Select
            value={options.type}
            onChange={(e) => setOptions(prev => ({ ...prev, type: e.target.value as any }))}
          >
            <option value="quantum">🔐 Quantum-Safe</option>
            <option value="neural">🧠 Advanced</option>
            <option value="random">🎲 Secure Random</option>
          </Select>
        </div>

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

        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => setOptions(prev => ({ ...prev, includeSymbols: e.target.checked }))}
              className="modern-checkbox"
            />
            <span className="text-sm text-foreground">Include Symbols</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.quantumSafe}
              onChange={(e) => setOptions(prev => ({ ...prev, quantumSafe: e.target.checked }))}
              className="modern-checkbox"
            />
            <span className="text-sm text-foreground">Quantum-Safe</span>
          </label>
        </div>

        <Button
          onClick={generateKey}
          loading={isGenerating}
          disabled={isGenerating}
          className="w-full"
          size="lg"
        >
          {!isGenerating && <Zap className="w-4 h-4" />}
          {isGenerating ? 'Generating...' : 'Generate Key'}
        </Button>

        {currentKey && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Generated Key</label>
              {keyStrength > 0 && (
                <Badge variant={keyStrength >= 90 ? 'success' : keyStrength >= 70 ? 'default' : keyStrength >= 50 ? 'warning' : 'destructive'}>
                  <Lock className="w-3 h-3 mr-1" />
                  {getStrengthLabel(keyStrength)}
                </Badge>
              )}
            </div>
            
            <div className="code-display">
              {currentKey}
            </div>
            
            {keyStrength > 0 && (
              <div className="space-y-3">
                <Progress 
                  value={keyStrength} 
                  variant={keyStrength >= 90 ? 'success' : keyStrength >= 70 ? 'default' : keyStrength >= 50 ? 'warning' : 'destructive'}
                  showValue
                  animated={isGenerating}
                />
                <StatCard
                  title="Key Strength Analysis"
                  value={`${keyStrength}%`}
                  description={getStrengthLabel(keyStrength)}
                  icon={Shield}
                  variant={keyStrength >= 90 ? 'success' : keyStrength >= 70 ? 'default' : keyStrength >= 50 ? 'warning' : 'destructive'}
                />
              </div>
            )}
          </div>
        )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default KeyGenerator
