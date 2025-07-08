import { KeyGenerationOptions } from '../types/cipher'

// Simulate quantum-safe key generation (using CRYSTALS-Kyber-like approach)
export async function generateQuantumSafeKey(options: KeyGenerationOptions): Promise<string> {
  // Simulate lattice-based cryptography key generation
  const entropy = new Uint8Array(options.length * 2)
  crypto.getRandomValues(entropy)
  
  // Apply lattice-based transformations (simplified)
  const latticeMatrix = generateLatticeMatrix(options.entropy)
  const transformedEntropy = applyLatticeTransform(entropy, latticeMatrix)
  
  return bytesToHex(transformedEntropy.slice(0, options.length))
}

// Simulate AI-generated key using neural network patterns
export async function generateNeuralKey(options: KeyGenerationOptions): Promise<string> {
  // Simulate neural network entropy generation
  const layers = 3
  const neurons = 256
  
  let seed = new Uint8Array(32)
  crypto.getRandomValues(seed)
  
  // Simulate forward propagation through neural layers
  for (let layer = 0; layer < layers; layer++) {
    seed = await simulateNeuralLayer(seed, neurons)
  }
  
  // Convert to hex and truncate to desired length
  const hexKey = bytesToHex(seed)
  return hexKey.substring(0, options.length * 2).toLowerCase()
}

// Analyze key strength using multiple criteria
export function analyzeKeyStrength(key: string): number {
  let score = 0
  
  // Length scoring (0-25 points)
  const lengthScore = Math.min(25, (key.length / 64) * 25)
  score += lengthScore
  
  // Character diversity (0-25 points)
  const charTypes = {
    lowercase: /[a-z]/.test(key),
    uppercase: /[A-Z]/.test(key),
    numbers: /[0-9]/.test(key),
    symbols: /[^a-zA-Z0-9]/.test(key)
  }
  const diversityScore = Object.values(charTypes).filter(Boolean).length * 6.25
  score += diversityScore
  
  // Entropy analysis (0-25 points)
  const entropy = calculateEntropy(key)
  const entropyScore = Math.min(25, (entropy / 8) * 25)
  score += entropyScore
  
  // Pattern detection (0-25 points, deducted for patterns)
  const patternPenalty = detectPatterns(key)
  const patternScore = Math.max(0, 25 - patternPenalty)
  score += patternScore
  
  return Math.round(score)
}

// Helper functions
function generateLatticeMatrix(size: number): number[][] {
  const matrix: number[][] = []
  for (let i = 0; i < size / 8; i++) {
    matrix[i] = []
    for (let j = 0; j < size / 8; j++) {
      matrix[i][j] = Math.random() * 2 - 1 // Random values between -1 and 1
    }
  }
  return matrix
}

function applyLatticeTransform(data: Uint8Array, matrix: number[][]): Uint8Array {
  const result = new Uint8Array(data.length)
  const size = Math.min(matrix.length, data.length)
  
  for (let i = 0; i < size; i++) {
    let sum = 0
    for (let j = 0; j < size && j < matrix[i].length; j++) {
      sum += data[j] * matrix[i][j]
    }
    result[i] = Math.abs(Math.round(sum)) % 256
  }
  
  return result
}

async function simulateNeuralLayer(input: Uint8Array, _neurons: number): Promise<Uint8Array> {
  const output = new Uint8Array(32)
  
  for (let i = 0; i < 32; i++) {
    let activation = 0
    for (let j = 0; j < input.length; j++) {
      const weight = Math.sin(i * j + input[j]) // Simulated weight
      activation += input[j] * weight
    }
    // Apply activation function (sigmoid-like)
    output[i] = Math.round(255 / (1 + Math.exp(-activation / 128)))
  }
  
  return output
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
}

function calculateEntropy(str: string): number {
  const freq: { [key: string]: number } = {}
  
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1
  }
  
  let entropy = 0
  for (const count of Object.values(freq)) {
    const p = count / str.length
    entropy -= p * Math.log2(p)
  }
  
  return entropy
}

function detectPatterns(key: string): number {
  let penalty = 0
  
  // Check for repeated characters
  const repeatedChars = key.match(/(.)\1{2,}/g)
  if (repeatedChars) {
    penalty += repeatedChars.length * 3
  }
  
  // Check for sequential patterns
  for (let i = 0; i < key.length - 2; i++) {
    const char1 = key.charCodeAt(i)
    const char2 = key.charCodeAt(i + 1)
    const char3 = key.charCodeAt(i + 2)
    
    if (char2 === char1 + 1 && char3 === char2 + 1) {
      penalty += 2
    }
  }
  
  // Check for common patterns
  const commonPatterns = ['123', 'abc', 'qwe', 'asd', 'zxc']
  for (const pattern of commonPatterns) {
    if (key.toLowerCase().includes(pattern)) {
      penalty += 5
    }
  }
  
  return penalty
}
