import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Shield, AlertTriangle, TrendingUp, Eye, Play, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { CipherState, AnalysisResults } from '../types/cipher'
import { analyzeText, predictVulnerabilities, calculateSecurityScore } from '../utils/aiAnalysis'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Button } from './ui/Button'
import { Progress } from './ui/Progress'
import { Badge } from './ui/Badge'
import { StatCard } from './ui/StatCard'

interface AIAnalyzerProps {
  cipherState: CipherState
  onAnalysisComplete: (results: AnalysisResults) => void
}

const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ cipherState, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [results, setResults] = useState<AnalysisResults | null>(null)

  const runAnalysis = async () => {
    if (!cipherState.outputText && !cipherState.inputText) {
      toast.error('No text to analyze')
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    try {
      const textToAnalyze = cipherState.outputText || cipherState.inputText
      
      // Simulate analysis progress
      const progressSteps = [
        { progress: 20, message: 'Analyzing entropy...' },
        { progress: 40, message: 'Pattern detection...' },
        { progress: 60, message: 'Security assessment...' },
        { progress: 80, message: 'Generating report...' },
        { progress: 100, message: 'Complete!' }
      ]

      for (const step of progressSteps) {
        setCurrentStep(step.message)
        setAnalysisProgress(step.progress)
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      // Perform actual analysis
      const entropy = calculateEntropy(textToAnalyze)
      const patternAnalysis = await analyzeText(textToAnalyze)
      const frequencyAnalysis = calculateFrequencyAnalysis(textToAnalyze)
      const aiPredictions = await predictVulnerabilities(textToAnalyze, cipherState.key)
      const securityScore = calculateSecurityScore(cipherState)

      const analysisResults: AnalysisResults = {
        entropy,
        patternAnalysis,
        frequencyAnalysis,
        strength: securityScore,
        aiPredictions,
        vulnerabilities: [],
        recommendations: generateRecommendations(securityScore, aiPredictions)
      }

      setResults(analysisResults)
      onAnalysisComplete(analysisResults)
      toast.success('Analysis completed!', { icon: '📊' })

    } catch (error) {
      toast.error('Analysis failed')
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
      setCurrentStep('')
    }
  }

  // Helper functions
  const calculateEntropy = (text: string): number => {
    if (!text) return 0
    
    const freq: { [key: string]: number } = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }
    
    let entropy = 0
    for (const count of Object.values(freq)) {
      const p = count / text.length
      entropy -= p * Math.log2(p)
    }
    
    return Math.round(entropy * 100) / 100
  }

  const calculateFrequencyAnalysis = (text: string) => {
    const freq: { [key: string]: number } = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }
    
    return Object.entries(freq)
      .map(([character, count]) => ({
        character,
        count,
        frequency: Math.round((count / text.length) * 100 * 100) / 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }

  const generateRecommendations = (score: number, predictions: any[]): string[] => {
    const recommendations = []
    
    if (score < 30) {
      recommendations.push('Consider using a stronger encryption algorithm')
      recommendations.push('Increase key length for better security')
    }
    
    if (score < 60) {
      recommendations.push('Add additional layers of encryption')
      recommendations.push('Implement key rotation policies')
    }
    
    if (predictions.some(p => p.risk === 'high')) {
      recommendations.push('Address high-risk vulnerabilities immediately')
      recommendations.push('Consider using quantum-resistant algorithms')
    }
    
    return recommendations
  }

  const getStrengthColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStrengthBadgeVariant = (score: number) => {
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">AI Security Analyzer</h2>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isAnalyzing && !results && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Ready to analyze your cipher for security vulnerabilities and patterns
            </p>
            <Button
              onClick={runAnalysis}
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
                value={`${results.strength}/100`}
                icon={Shield}
                className={getStrengthColor(results.strength)}
              />
              <StatCard
                title="Entropy"
                value={`${results.entropy} bits`}
                icon={TrendingUp}
                description="Randomness measure"
              />
              <StatCard
                title="Algorithm"
                value={cipherState.algorithm.toUpperCase()}
                icon={Eye}
                description="Current cipher"
              />
            </div>

            {/* Security Assessment */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Security Assessment</h3>
                  <Badge variant={getStrengthBadgeVariant(results.strength)}>
                    {results.strength >= 80 ? 'Strong' : results.strength >= 60 ? 'Moderate' : 'Weak'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Strength</span>
                    <Progress value={results.strength} className="w-32" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Entropy Score</span>
                    <Progress value={Math.min(results.entropy * 10, 100)} className="w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Frequency Analysis */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Character Frequency Analysis</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {results.frequencyAnalysis.slice(0, 10).map((item, index) => (
                    <div key={index} className="text-center p-2 bg-muted/50 rounded">
                      <div className="font-mono text-sm font-medium">
                        {item.character === ' ' ? 'Space' : item.character}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.frequency}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Predictions */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">AI Security Predictions</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.aiPredictions.length > 0 ? (
                    results.aiPredictions.map((prediction, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                          prediction.risk === 'high' ? 'text-red-500' : 
                          prediction.risk === 'medium' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{prediction.type}</div>
                          <div className="text-xs text-muted-foreground">{prediction.description}</div>
                        </div>
                        <Badge variant={prediction.risk === 'high' ? 'destructive' : 'secondary'}>
                          {prediction.risk}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      No significant vulnerabilities detected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {results.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Security Recommendations</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Re-run Analysis */}
            <div className="flex justify-center">
              <Button
                onClick={runAnalysis}
                variant="outline"
                disabled={isAnalyzing}
              >
                <Brain className="w-4 h-4 mr-2" />
                Re-run Analysis
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default AIAnalyzer
