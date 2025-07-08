export interface CipherAlgorithm {
  name: string
  id: string
  keySize: number
  description: string
  strength: 'low' | 'medium' | 'high' | 'quantum-resistant'
}

export interface CipherState {
  inputText: string
  outputText: string
  key: string
  algorithm: string
  mode: 'encrypt' | 'decrypt'
  analysisResults: AnalysisResults | null
}

export interface AnalysisResults {
  entropy: number
  patternAnalysis: PatternAnalysis
  frequencyAnalysis: FrequencyData[]
  strength: SecurityStrength
  aiPredictions: AIPrediction[]
  vulnerabilities: Vulnerability[]
  recommendations: string[]
}

export interface PatternAnalysis {
  repeatingPatterns: Pattern[]
  randomnessScore: number
  correlationCoefficient: number
}

export interface Pattern {
  pattern: string
  frequency: number
  positions: number[]
}

export interface FrequencyData {
  character: string
  frequency: number
  expected: number
  deviation: number
}

export interface SecurityStrength {
  overall: number
  keyStrength: number
  algorithmStrength: number
  implementationStrength: number
  quantumResistance: number
}

export interface AIPrediction {
  type: 'weakness' | 'strength' | 'optimization' | 'threat'
  confidence: number
  description: string
  impact: 'low' | 'medium' | 'high' | 'critical'
}

export interface Vulnerability {
  id: string
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  mitigation: string
  cvssScore?: number
}

export interface KeyGenerationOptions {
  length: number
  type: 'random' | 'passphrase' | 'quantum' | 'neural'
  entropy: number
  includeSymbols: boolean
  quantumSafe: boolean
}

export interface VisualizationData {
  entropyGraph: EntropyPoint[]
  frequencyDistribution: FrequencyData[]
  keySchedule: KeySchedulePoint[]
  avalancheEffect: AvalancheData[]
  correlationMatrix: CorrelationData[][]
}

export interface EntropyPoint {
  position: number
  entropy: number
  localEntropy: number
}

export interface KeySchedulePoint {
  round: number
  key: string
  entropy: number
}

export interface AvalancheData {
  bitFlip: number
  outputChange: number
  percentage: number
}

export interface CorrelationData {
  x: number
  y: number
  correlation: number
}
