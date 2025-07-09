import { CipherState, PatternAnalysis, AIPrediction, SecurityStrength } from '../types/cipher'

// AI-powered text analysis
export async function analyzeText(text: string): Promise<PatternAnalysis> {
  // Simulate AI analysis delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const patterns = findRepeatingPatterns(text)
  const randomnessScore = calculateRandomnessScore(text)
  const correlationCoefficient = calculateCorrelation(text)
  
  return {
    repeatingPatterns: patterns,
    randomnessScore,
    correlationCoefficient
  }
}

// Predict vulnerabilities using AI techniques with algorithm awareness
export async function predictVulnerabilities(text: string, key: string, algorithm: string = 'unknown'): Promise<AIPrediction[]> {
  const predictions: AIPrediction[] = []
  
  // Calculate metrics for analysis
  const entropy = calculateTextEntropy(text)
  const frequencyDist = analyzeFrequencyDistribution(text)
  const patterns = findRepeatingPatterns(text)
  
  // Algorithm-specific analysis (only add if algorithm is actually problematic)
  if (algorithm.toLowerCase() === 'rc4') {
    // Only warn about RC4 if it's actually being used
    predictions.push({
      type: 'weakness',
      confidence: 0.95,
      description: 'RC4 algorithm has known vulnerabilities (biased keystream, related-key attacks)',
      impact: 'high',
      risk: 'high'
    })
  }
  
  // Key analysis - be more specific about thresholds
  if (key.length < 8) {
    predictions.push({
      type: 'weakness',
      confidence: 0.95,
      description: 'Extremely short key - vulnerable to brute force within hours',
      impact: 'high',
      risk: 'high'
    })
  } else if (key.length < 12 && algorithm.toLowerCase() !== 'xor') {
    predictions.push({
      type: 'weakness',
      confidence: 0.80,
      description: 'Short key length - consider using 16+ characters for better security',
      impact: 'medium',
      risk: 'medium'
    })
  }
  
  // Entropy analysis - more nuanced thresholds
  if (entropy < 1.5) {
    predictions.push({
      type: 'weakness',
      confidence: 0.88,
      description: 'Very low entropy detected - high pattern predictability',
      impact: 'high',
      risk: 'high'
    })
  } else if (entropy < 3.0 && algorithm.toLowerCase() !== 'xor') {
    predictions.push({
      type: 'weakness',
      confidence: 0.65,
      description: 'Low entropy - text may contain predictable patterns',
      impact: 'medium',
      risk: 'medium'
    })
  } else if (entropy > 6.5) {
    predictions.push({
      type: 'strength',
      confidence: 0.85,
      description: 'High entropy indicates good randomness distribution',
      impact: 'low',
      risk: 'low'
    })
  }
  
  // Frequency analysis - only flag if significantly uneven
  if (frequencyDist.deviation > 0.5) {
    predictions.push({
      type: 'weakness',
      confidence: 0.70,
      description: 'High character frequency concentration detected',
      impact: 'medium',
      risk: 'medium'
    })
  }
  
  // Pattern analysis - only flag if many patterns
  if (patterns.length > 8) {
    predictions.push({
      type: 'weakness',
      confidence: 0.75,
      description: `${patterns.length} repeating patterns detected - may indicate weak encryption`,
      impact: 'medium',
      risk: 'medium'
    })
  }
  
  // Positive assessments for good configurations
  if (algorithm.toLowerCase() === 'aes' && key.length >= 16) {
    predictions.push({
      type: 'strength',
      confidence: 0.90,
      description: 'AES with adequate key length provides strong security',
      impact: 'low',
      risk: 'low'
    })
  }
  
  // Only suggest optimizations if there are actual issues
  if (algorithm.toLowerCase() === 'rc4' || (entropy < 4.0 && key.length < 16)) {
    predictions.push({
      type: 'optimization',
      confidence: 0.76,
      description: 'Consider using AES-256 or ChaCha20 for enhanced security',
      impact: 'low',
      risk: 'low'
    })
  }
  
  // Quantum threats - only for algorithms that will be affected
  if (algorithm.toLowerCase() === 'aes' && key.length < 32) {
    predictions.push({
      type: 'threat',
      confidence: 0.60,
      description: 'AES-128/192 security reduced by ~50% against quantum computers',
      impact: 'medium',
      risk: 'medium'
    })
  }
  
  // If no significant issues found, add positive feedback
  if (predictions.length === 0 || predictions.every(p => p.type === 'strength')) {
    predictions.push({
      type: 'strength',
      confidence: 0.80,
      description: 'No significant vulnerabilities detected in current configuration',
      impact: 'low',
      risk: 'low'
    })
  }
  
  return predictions
}

// Calculate comprehensive security score
export function calculateSecurityScore(cipherState: CipherState): SecurityStrength {
  const keyStrength = calculateKeyStrength(cipherState.key)
  const algorithmStrength = getAlgorithmStrength(cipherState.algorithm)
  const implementationStrength = 75 // Simulated implementation score
  const quantumResistance = getQuantumResistance(cipherState.algorithm)
  
  const overall = Math.round(
    (keyStrength * 0.3 + 
     algorithmStrength * 0.25 + 
     implementationStrength * 0.25 + 
     quantumResistance * 0.2)
  )
  
  return {
    overall,
    keyStrength,
    algorithmStrength,
    implementationStrength,
    quantumResistance
  }
}

// Helper functions
function findRepeatingPatterns(text: string) {
  const patterns = []
  const minPatternLength = 2
  const maxPatternLength = Math.min(10, Math.floor(text.length / 2))
  
  for (let len = minPatternLength; len <= maxPatternLength; len++) {
    const patternMap = new Map<string, number[]>()
    
    for (let i = 0; i <= text.length - len; i++) {
      const pattern = text.substring(i, i + len)
      if (!patternMap.has(pattern)) {
        patternMap.set(pattern, [])
      }
      patternMap.get(pattern)!.push(i)
    }
    
    // Filter patterns that occur more than once
    for (const [pattern, positions] of patternMap) {
      if (positions.length > 1) {
        patterns.push({
          pattern,
          frequency: positions.length,
          positions
        })
      }
    }
  }
  
  return patterns
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10)
}

function calculateRandomnessScore(text: string): number {
  if (!text) return 0
  
  // Calculate various randomness metrics
  const entropy = calculateTextEntropy(text)
  const uniformity = calculateUniformity(text)
  const serialCorrelation = calculateSerialCorrelation(text)
  
  // Combine metrics (higher is more random)
  const score = (entropy / 8) * 0.5 + uniformity * 0.3 + (1 - serialCorrelation) * 0.2
  
  return Math.max(0, Math.min(1, score))
}

function calculateCorrelation(text: string): number {
  if (text.length < 2) return 0
  
  let correlation = 0
  for (let i = 0; i < text.length - 1; i++) {
    const curr = text.charCodeAt(i)
    const next = text.charCodeAt(i + 1)
    correlation += Math.abs(next - curr) / 255
  }
  
  return correlation / (text.length - 1)
}

function calculateTextEntropy(text: string): number {
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
  
  return entropy
}

function analyzeFrequencyDistribution(text: string) {
  if (!text || text.length < 2) {
    return { average: 0, variance: 0, deviation: 0 }
  }
  
  const freq: { [key: string]: number } = {}
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1
  }
  
  const frequencies = Object.values(freq)
  const uniqueChars = frequencies.length
  
  // For good encryption, we expect roughly uniform distribution
  const expectedFreq = text.length / uniqueChars
  
  // Calculate chi-square-like deviation
  let chiSquareSum = 0
  for (const f of frequencies) {
    chiSquareSum += Math.pow(f - expectedFreq, 2) / expectedFreq
  }
  
  // Normalize deviation (0 = perfect uniform, 1 = highly skewed)
  const deviation = Math.min(1, chiSquareSum / uniqueChars)
  
  const average = frequencies.reduce((a, b) => a + b, 0) / frequencies.length
  const variance = frequencies.reduce((sum, f) => sum + Math.pow(f - average, 2), 0) / frequencies.length
  
  return { 
    average, 
    variance, 
    deviation: deviation,
    uniqueChars,
    expectedFreq
  }
}

function calculateKeyStrength(key: string): number {
  if (!key) return 0
  
  let score = 0
  
  // Length bonus
  score += Math.min(30, key.length * 2)
  
  // Character diversity
  const hasLower = /[a-z]/.test(key)
  const hasUpper = /[A-Z]/.test(key)
  const hasDigits = /[0-9]/.test(key)
  const hasSymbols = /[^a-zA-Z0-9]/.test(key)
  
  score += (hasLower ? 15 : 0)
  score += (hasUpper ? 15 : 0)
  score += (hasDigits ? 15 : 0)
  score += (hasSymbols ? 15 : 0)
  
  // Entropy bonus
  const entropy = calculateTextEntropy(key)
  score += Math.min(10, entropy * 2)
  
  return Math.min(100, score)
}

function getAlgorithmStrength(algorithm: string): number {
  const strengths: { [key: string]: number } = {
    'rc4': 25,      // Seriously broken
    'xor': 10,      // Educational only
    'caesar': 5,    // Historical curiosity
    'aes': 95,      // Gold standard
    'chacha20': 92, // Modern alternative
    'salsa20': 85,  // Good but older
    'des': 15,      // Broken
    'triple_des': 45, // Legacy support only
    'blowfish': 70  // Decent but aging
  }
  
  return strengths[algorithm.toLowerCase()] || 50
}

function getQuantumResistance(algorithm: string): number {
  // Most current algorithms are not quantum-resistant
  const resistance: { [key: string]: number } = {
    'rc4': 10,
    'chacha20': 25,
    'aes': 20,
    'salsa20': 20
  }
  
  return resistance[algorithm.toLowerCase()] || 15
}

function calculateUniformity(text: string): number {
  const freq: { [key: string]: number } = {}
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1
  }
  
  const uniqueChars = Object.keys(freq).length
  const expectedFreq = text.length / uniqueChars
  
  let uniformity = 0
  for (const count of Object.values(freq)) {
    uniformity += Math.abs(count - expectedFreq)
  }
  
  return 1 - (uniformity / (text.length * 2))
}

function calculateSerialCorrelation(text: string): number {
  if (text.length < 2) return 0
  
  let correlation = 0
  for (let i = 0; i < text.length - 1; i++) {
    correlation += text.charCodeAt(i) * text.charCodeAt(i + 1)
  }
  
  return correlation / (text.length - 1) / (255 * 255)
}
