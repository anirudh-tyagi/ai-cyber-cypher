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

// Predict vulnerabilities using AI techniques
export async function predictVulnerabilities(text: string, key: string): Promise<AIPrediction[]> {
  const predictions: AIPrediction[] = []
  
  // Analyze key weakness
  if (key.length < 16) {
    predictions.push({
      type: 'weakness',
      confidence: 0.85,
      description: 'Short key length detected. Vulnerable to brute force attacks.',
      impact: 'high',
      risk: 'high'
    })
  }
  
  // Analyze text patterns
  const entropy = calculateTextEntropy(text)
  if (entropy < 3.5) {
    predictions.push({
      type: 'weakness',
      confidence: 0.72,
      description: 'Low entropy detected. Text may have predictable patterns.',
      impact: 'medium',
      risk: 'medium'
    })
  }
  
  // Analyze frequency distribution
  const frequencyDist = analyzeFrequencyDistribution(text)
  if (frequencyDist.deviation > 0.3) {
    predictions.push({
      type: 'weakness',
      confidence: 0.68,
      description: 'Uneven character distribution suggests weak encryption.',
      impact: 'medium',
      risk: 'medium'
    })
  }
  
  // Positive predictions
  if (entropy > 7.0) {
    predictions.push({
      type: 'strength',
      confidence: 0.91,
      description: 'High entropy indicates good randomness properties.',
      impact: 'low',
      risk: 'low'
    })
  }
  
  // Optimization suggestions
  predictions.push({
    type: 'optimization',
    confidence: 0.76,
    description: 'Consider using ChaCha20 for better performance and security.',
    impact: 'low',
    risk: 'low'
  })
  
  // Quantum threats
  predictions.push({
    type: 'threat',
    confidence: 0.45,
    description: 'Current algorithm may be vulnerable to future quantum attacks.',
    impact: 'high',
    risk: 'medium'
  })
  
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
  const freq: { [key: string]: number } = {}
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1
  }
  
  const frequencies = Object.values(freq)
  const average = frequencies.reduce((a, b) => a + b, 0) / frequencies.length
  const variance = frequencies.reduce((sum, f) => sum + Math.pow(f - average, 2), 0) / frequencies.length
  const deviation = Math.sqrt(variance) / average
  
  return { average, variance, deviation }
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
    'rc4': 60,  // Known weaknesses
    'chacha20': 95,  // Modern, secure
    'aes': 90,  // Well-tested, secure
    'salsa20': 85  // Good but older
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
