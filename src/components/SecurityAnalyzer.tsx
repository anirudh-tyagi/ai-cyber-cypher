import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Brain, AlertTriangle, Lock, Play, CheckCircle } from 'lucide-react'
import { CipherState, AnalysisResults } from '../types/cipher'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Button } from './ui/Button'
import { Progress } from './ui/Progress'
import { Badge } from './ui/Badge'
import { StatCard } from './ui/StatCard'
import { apiClient } from '../services/apiClient'
import toast from 'react-hot-toast'

interface SecurityAnalyzerProps {
  cipherState: CipherState
  onAnalysisComplete: (results: AnalysisResults) => void
}

const SecurityAnalyzer: React.FC<SecurityAnalyzerProps> = ({ cipherState, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [results, setResults] = useState<AnalysisResults | null>(null)

  const runSecurityAnalysis = async () => {
    if (!cipherState.outputText && !cipherState.inputText) {
      toast.error('No text to analyze')
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    try {
      const textToAnalyze = cipherState.outputText || cipherState.inputText
      
      // Progress simulation with actual API calls
      const steps = [
        { progress: 20, message: 'Analyzing entropy...', action: () => analyzeEntropy(textToAnalyze) },
        { progress: 40, message: 'Pattern detection...', action: () => detectPatterns(textToAnalyze) },
        { progress: 60, message: 'Security assessment...', action: () => assessSecurity(textToAnalyze) },
        { progress: 80, message: 'AI analysis...', action: () => runAIAnalysis(textToAnalyze) },
        { progress: 100, message: 'Complete!', action: null }
      ]

      let analysisData: any = {
        entropy: 0,
        patterns: [],
        vulnerabilities: [],
        aiPredictions: [],
        keyStrength: 0,
        algorithmStrength: 0,
        implementationStrength: 77,
        quantumResistance: 60,
        overall: 0
      }

      for (const step of steps) {
        setCurrentStep(step.message)
        setAnalysisProgress(step.progress)
        
        if (step.action) {
          const stepResult = await step.action()
          if (stepResult) {
            analysisData = { ...analysisData, ...stepResult }
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      // Create analysis results with proper data
      const analysisResults: AnalysisResults = {
        entropy: analysisData.entropy || 4.2,
        patternAnalysis: {
          repeatingPatterns: analysisData.patterns || [],
          randomnessScore: analysisData.randomnessScore || 85,
          correlationCoefficient: analysisData.correlationCoefficient || 0.15
        },
        frequencyAnalysis: analysisData.frequencyAnalysis || [],
        strength: {
          overall: analysisData.overall || 78,
          keyStrength: analysisData.keyStrength || 82,
          algorithmStrength: analysisData.algorithmStrength || 75,
          implementationStrength: analysisData.implementationStrength || 77,
          quantumResistance: analysisData.quantumResistance || 65
        },
        aiPredictions: analysisData.aiPredictions || [],
        vulnerabilities: analysisData.vulnerabilities || [],
        recommendations: analysisData.recommendations || []
      }

      setResults(analysisResults)
      onAnalysisComplete(analysisResults)
      toast.success('Security analysis completed!', { icon: '🛡️' })

    } catch (error) {
      toast.error('Analysis failed')
      console.error('Security analysis error:', error)
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
      setCurrentStep('')
    }
  }

  const analyzeEntropy = async (text: string) => {
    try {
      // Try API call, fallback to local calculation
      const response = await apiClient.analyzeText(text, cipherState.key, cipherState.algorithm)
      return { entropy: response.entropy || calculateLocalEntropy(text) }
    } catch {
      return { entropy: calculateLocalEntropy(text) }
    }
  }

  const detectPatterns = async (_text: string) => {
    // Local pattern detection
    const patterns: any[] = []
    const chunks = _text.match(/.{1,4}/g) || []
    const frequency: { [key: string]: number } = {}
    
    chunks.forEach(chunk => {
      frequency[chunk] = (frequency[chunk] || 0) + 1
    })

    Object.entries(frequency).forEach(([pattern, count]) => {
      if (count > 1) {
        patterns.push({ pattern, frequency: count, positions: [] })
      }
    })

    return { 
      patterns,
      randomnessScore: Math.max(0, 100 - patterns.length * 5),
      correlationCoefficient: Math.min(1, patterns.length / 10)
    }
  }

  const assessSecurity = async (_text: string) => {
    const keyStrength = calculateKeyStrength(cipherState.key)
    const algorithmStrength = getAlgorithmStrength(cipherState.algorithm)
    const implementationStrength = 77
    const quantumResistance = cipherState.algorithm === 'chacha20' ? 85 : 60
    
    // Calculate overall strength as weighted average
    const overall = Math.round(
      keyStrength * 0.35 + 
      algorithmStrength * 0.25 + 
      implementationStrength * 0.25 + 
      quantumResistance * 0.15
    )
    
    return {
      keyStrength,
      algorithmStrength,
      implementationStrength,
      quantumResistance,
      overall // Fixed property name
    }
  }

  const runAIAnalysis = async (text: string) => {
    const entropy = calculateLocalEntropy(text)
    const keyLength = cipherState.key.length
    const algorithm = cipherState.algorithm.toLowerCase()
    const keyStrength = calculateKeyStrength(cipherState.key)
    const algorithmStrength = getAlgorithmStrength(algorithm)
    
    const predictions = []
    const vulnerabilities = []
    const recommendations = []

    // Analyze key strength
    if (keyLength < 12) {
      vulnerabilities.push('Key length critically low (< 12 characters)')
      predictions.push({
        type: 'weakness',
        confidence: 0.95,
        description: 'Extremely short key makes brute force attacks feasible',
        impact: 'critical' as const,
        risk: 'high' as const
      })
      recommendations.push('Use a minimum key length of 16 characters')
    } else if (keyLength < 16) {
      vulnerabilities.push('Key length below recommended minimum (16+ characters)')
      recommendations.push('Use a longer key (32+ characters recommended)')
    }

    // Analyze key quality
    if (keyStrength < 40) {
      vulnerabilities.push('Key has poor complexity and patterns')
      recommendations.push('Use mixed case letters, numbers, and special characters')
    }

    // Analyze algorithm security
    if (algorithmStrength < 30) {
      vulnerabilities.push(`${algorithm.toUpperCase()} algorithm is cryptographically broken`)
      predictions.push({
        type: 'threat',
        confidence: 0.9,
        description: `${algorithm.toUpperCase()} has known vulnerabilities and should not be used`,
        impact: 'critical' as const,
        risk: 'high' as const
      })
      recommendations.push('Upgrade to AES-256 or ChaCha20 immediately')
    } else if (algorithmStrength < 60) {
      vulnerabilities.push(`${algorithm.toUpperCase()} algorithm has known weaknesses`)
      recommendations.push('Consider upgrading to a more modern cipher like AES or ChaCha20')
    }

    // Analyze entropy
    if (entropy < 3.5) {
      vulnerabilities.push('Very low entropy detected - high pattern predictability')
      predictions.push({
        type: 'weakness',
        confidence: 0.85,
        description: 'Extremely low entropy suggests highly predictable patterns',
        impact: 'high' as const,
        risk: 'high' as const
      })
    } else if (entropy < 4.5) {
      vulnerabilities.push('Low entropy detected - text may contain patterns')
      predictions.push({
        type: 'weakness',
        confidence: 0.7,
        description: 'Low entropy suggests some predictable patterns in the data',
        impact: 'medium' as const,
        risk: 'medium' as const
      })
    } else {
      predictions.push({
        type: 'strength',
        confidence: 0.8,
        description: 'Good entropy levels - no obvious patterns detected',
        impact: 'low' as const,
        risk: 'low' as const
      })
    }

    // Frequency analysis recommendations
    const frequencyAnalysis = calculateFrequencyAnalysis(text)
    const topCharFreq = frequencyAnalysis[0]?.frequency || 0
    if (topCharFreq > 15) {
      vulnerabilities.push('High character frequency concentration detected')
      recommendations.push('Consider using a different plaintext or encryption mode')
    }

    // General security recommendations
    if (!vulnerabilities.length) {
      recommendations.push('Security configuration appears robust')
    }
    recommendations.push('Implement regular key rotation policy')
    recommendations.push('Monitor encrypted data for anomalies')
    
    // Algorithm-specific recommendations
    if (algorithm === 'aes') {
      recommendations.push('Ensure you are using AES-256 with a proper mode (GCM recommended)')
    } else if (algorithm === 'chacha20') {
      recommendations.push('ChaCha20 is excellent - ensure proper nonce management')
    }

    return { 
      aiPredictions: predictions, 
      vulnerabilities, 
      recommendations,
      frequencyAnalysis
    }
  }

  const calculateFrequencyAnalysis = (text: string) => {
    const freq: { [key: string]: number } = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }
    
    return Object.entries(freq)
      .map(([character, count]) => ({
        character,
        frequency: Math.round((count / text.length) * 100 * 100) / 100,
        expected: 100 / Object.keys(freq).length,
        deviation: Math.abs((count / text.length) * 100 - (100 / Object.keys(freq).length))
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10)
  }

  const calculateLocalEntropy = (text: string): number => {
    if (!text) return 0
    const freq: { [key: string]: number } = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }
    
    let entropy = 0
    const length = text.length
    Object.values(freq).forEach(count => {
      const p = count / length
      entropy -= p * Math.log2(p)
    })
    
    return Math.round(entropy * 100) / 100
  }

  const calculateKeyStrength = (key: string): number => {
    if (!key) return 0
    
    let score = 0
    const length = key.length
    
    // Length scoring (0-40 points)
    if (length >= 32) score += 40
    else if (length >= 24) score += 35
    else if (length >= 16) score += 25
    else if (length >= 12) score += 15
    else if (length >= 8) score += 10
    else score += 5
    
    // Character variety (0-25 points)
    const hasLowercase = /[a-z]/.test(key)
    const hasUppercase = /[A-Z]/.test(key)
    const hasNumbers = /[0-9]/.test(key)
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(key)
    const hasComplexSpecials = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?~`]/.test(key)
    
    if (hasLowercase) score += 5
    if (hasUppercase) score += 5
    if (hasNumbers) score += 5
    if (hasSpecialChars) score += 5
    if (hasComplexSpecials) score += 5
    
    // Entropy calculation (0-25 points)
    const uniqueChars = new Set(key).size
    const entropyScore = Math.min(25, (uniqueChars / length) * 50)
    score += entropyScore
    
    // Pattern analysis (0-10 points penalty)
    const patterns = detectKeyPatterns(key)
    score -= patterns * 2
    
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  const detectKeyPatterns = (key: string): number => {
    let penalties = 0
    
    // Check for repeated characters
    const repeatedChars = key.match(/(.)\1{2,}/g)
    if (repeatedChars) penalties += repeatedChars.length
    
    // Check for sequential patterns
    const sequential = key.match(/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/gi)
    if (sequential) penalties += sequential.length
    
    // Check for keyboard patterns
    const keyboard = key.match(/(qwe|wer|ert|rty|tyu|yui|uio|iop|asd|sdf|dfg|fgh|ghj|hjk|jkl|zxc|xcv|cvb|vbn|bnm)/gi)
    if (keyboard) penalties += keyboard.length
    
    return penalties
  }

  const getAlgorithmStrength = (algorithm: string): number => {
    const strengths: { [key: string]: number } = {
      'aes': 95,        // Very strong, widely trusted
      'chacha20': 90,   // Modern, secure stream cipher
      'rc4': 25,        // Deprecated, many vulnerabilities
      'des': 15,        // Broken, should not be used
      '3des': 45,       // Deprecated but still somewhat secure
      'xor': 10,        // Educational only, not secure
      'caesar': 5,      // Historical cipher, easily broken
      'vigenere': 20,   // Classical cipher, frequency analysis vulnerable
      'blowfish': 70,   // Good but aging
      'twofish': 85,    // Strong but less common
      'serpent': 90,    // Very secure
      'rsa': 80,        // Asymmetric, depends on key size
      'ecc': 90         // Elliptic curve, efficient and secure
    }
    
    const normalizedAlgorithm = algorithm.toLowerCase().replace(/[-_\s]/g, '')
    return strengths[normalizedAlgorithm] || 50 // Default for unknown algorithms
  }

  const getStrengthColor = (strength: any): string => {
    const score = typeof strength === 'object' ? strength.overall : strength
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStrengthBadgeVariant = (strength: any) => {
    const score = typeof strength === 'object' ? strength.overall : strength
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Security Analyzer</h2>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isAnalyzing && !results && (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Advanced security analysis for your cryptographic operations
            </p>
            <Button
              onClick={runSecurityAnalysis}
              disabled={!cipherState.outputText && !cipherState.inputText}
              className="min-w-32"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Analysis
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">{currentStep}</span>
            </div>
            <Progress value={analysisProgress} className="w-full" />
            <div className="text-center text-sm text-muted-foreground">
              {analysisProgress}% Complete
            </div>
          </div>
        )}

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Security Score"
                value={`${results.strength.overall}/100`}
                icon={Shield}
                className={getStrengthColor(results.strength)}
              />
              <StatCard
                title="Entropy"
                value={`${results.entropy} bits`}
                icon={Brain}
                description="Randomness measure"
              />
              <StatCard
                title="Algorithm"
                value={cipherState.algorithm.toUpperCase()}
                icon={Lock}
                description="Current cipher"
              />
            </div>

            {/* Security Assessment */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Detailed Security Assessment</h3>
                  <Badge variant={getStrengthBadgeVariant(results.strength)}>
                    {results.strength.overall >= 80 ? 'Strong' : results.strength.overall >= 60 ? 'Moderate' : 'Weak'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Overall Strength</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={results.strength.overall} className="w-24" />
                          <span className="text-sm font-medium">{results.strength.overall}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Key Strength</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={results.strength.keyStrength} className="w-24" />
                          <span className="text-sm font-medium">{results.strength.keyStrength}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Algorithm Strength</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={results.strength.algorithmStrength} className="w-24" />
                          <span className="text-sm font-medium">{results.strength.algorithmStrength}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Implementation</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={results.strength.implementationStrength} className="w-24" />
                          <span className="text-sm font-medium">{results.strength.implementationStrength}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Quantum Resistance</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={results.strength.quantumResistance} className="w-24" />
                          <span className="text-sm font-medium">{results.strength.quantumResistance}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Data Entropy</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={Math.min(100, results.entropy * 20)} className="w-24" />
                          <span className="text-sm font-medium">{results.entropy} bits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vulnerabilities and AI Predictions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Vulnerabilities & AI Analysis</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Vulnerabilities */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Security Vulnerabilities</h4>
                    {results.vulnerabilities.length > 0 ? (
                      <div className="space-y-2">
                        {results.vulnerabilities.map((vuln, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <AlertTriangle className="w-4 h-4 mt-0.5 text-red-500" />
                            <div className="flex-1">
                              <div className="text-sm text-red-700 dark:text-red-300">{typeof vuln === 'string' ? vuln : vuln.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-3 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm">No critical vulnerabilities detected</div>
                      </div>
                    )}
                  </div>

                  {/* AI Predictions */}
                  {results.aiPredictions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">AI Security Insights</h4>
                      <div className="space-y-2">
                        {results.aiPredictions.map((prediction, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <Brain className="w-4 h-4 mt-0.5 text-blue-500" />
                            <div className="flex-1">
                              <div className="text-sm text-blue-700 dark:text-blue-300">
                                <span className="font-medium">{prediction.type}:</span> {prediction.description}
                              </div>
                              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                Confidence: {Math.round(prediction.confidence * 100)}% | Risk: {prediction.risk}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {results.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Security Recommendations</h4>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <Shield className="w-4 h-4 mt-0.5 text-yellow-600" />
                            <div className="text-sm text-yellow-700 dark:text-yellow-300">{rec}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default SecurityAnalyzer
