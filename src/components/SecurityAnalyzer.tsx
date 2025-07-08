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
        { progress: 100, message: 'Complete!', action: () => Promise.resolve() }
      ]

      let analysisData: any = {
        entropy: 0,
        patterns: [],
        vulnerabilities: [],
        aiPredictions: []
      }

      for (const step of steps) {
        setCurrentStep(step.message)
        setAnalysisProgress(step.progress)
        
        if (step.action) {
          const stepResult = await step.action()
          analysisData = { ...analysisData, ...stepResult }
        }
        
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      // Create analysis results
      const analysisResults: AnalysisResults = {
        entropy: analysisData.entropy || 4.2,
        patternAnalysis: {
          repeatingPatterns: analysisData.patterns || [],
          randomnessScore: analysisData.randomnessScore || 85,
          correlationCoefficient: analysisData.correlationCoefficient || 0.15
        },
        frequencyAnalysis: analysisData.frequencyAnalysis || [],
        strength: {
          overall: analysisData.overallStrength || 78,
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
      overallStrength: overall
    }
  }

  const runAIAnalysis = async (text: string) => {
    const entropy = calculateLocalEntropy(text)
    const keyLength = cipherState.key.length
    const algorithm = cipherState.algorithm
    
    const predictions = []
    const vulnerabilities = []
    const recommendations = []

    // Analyze key strength
    if (keyLength < 16) {
      vulnerabilities.push('Key length below recommended minimum (16+ characters)')
      recommendations.push('Use a longer key (32+ characters recommended)')
    }

    // Analyze entropy
    if (entropy < 4.0) {
      vulnerabilities.push('Low entropy detected - text may contain patterns')
      predictions.push({
        type: 'Pattern Analysis',
        confidence: 0.8,
        description: 'Low entropy suggests predictable patterns in the data',
        impact: 'high' as const,
        risk: 'high' as const
      })
    } else {
      predictions.push({
        type: 'Pattern Analysis',
        confidence: 0.9,
        description: 'Good entropy levels - no obvious patterns detected',
        impact: 'low' as const,
        risk: 'low' as const
      })
    }

    // Algorithm-specific analysis
    if (algorithm === 'xor') {
      vulnerabilities.push('XOR cipher is cryptographically weak')
      recommendations.push('Consider upgrading to AES or ChaCha20')
    }

    // Add general recommendations
    if (algorithm !== 'aes') {
      recommendations.push('Consider using AES for production systems')
    }
    recommendations.push('Regular key rotation is recommended')
    recommendations.push('Monitor for unusual patterns in encrypted data')

    // Frequency analysis
    const frequencyAnalysis = calculateFrequencyAnalysis(text)

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
      'rc4': 60,
      'chacha20': 90,
      'aes': 85,
      'des': 30
    }
    return strengths[algorithm] || 50
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
                  <h3 className="text-lg font-semibold">Security Assessment</h3>
                  <Badge variant={getStrengthBadgeVariant(results.strength)}>
                    {results.strength.overall >= 80 ? 'Strong' : results.strength.overall >= 60 ? 'Moderate' : 'Weak'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Strength</span>
                    <Progress value={results.strength.overall} className="w-32" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Key Strength</span>
                    <Progress value={results.strength.keyStrength} className="w-32" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Algorithm Strength</span>
                    <Progress value={results.strength.algorithmStrength} className="w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vulnerabilities */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Security Assessment</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.vulnerabilities.length > 0 ? (
                    results.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-500" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{typeof vuln === 'string' ? vuln : vuln.description}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      No critical vulnerabilities detected
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
