import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Activity, BarChart3, PieChart as PieChartIcon, TrendingUp, Shield, Eye, AlertTriangle } from 'lucide-react'
import { CipherState } from '../types/cipher'
import { Card, CardContent, CardHeader } from './ui/Card'
import { StatCard } from './ui/StatCard'
import { Button } from './ui/Button'
import { apiClient } from '../services/apiClient'
import toast from 'react-hot-toast'

interface AnalysisDashboardProps {
  cipherState: CipherState
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ cipherState }) => {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (cipherState.outputText || cipherState.inputText) {
      loadDashboardData()
    }
  }, [cipherState.outputText, cipherState.inputText, cipherState.algorithm])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      const textToAnalyze = cipherState.outputText || cipherState.inputText
      
      // Try to get data from API, fallback to local generation
      let analysisData
      try {
        analysisData = await apiClient.analyzeText(textToAnalyze, cipherState.key, cipherState.algorithm)
      } catch (error) {
        // Generate local data if API fails
        analysisData = generateLocalAnalysisData(textToAnalyze)
      }

      setDashboardData(analysisData)
    } catch (error) {
      toast.error('Failed to load dashboard data')
      console.error('Dashboard error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateLocalAnalysisData = (text: string) => {
    // Generate frequency data
    const freq: { [key: string]: number } = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }
    
    const frequencyData = Object.entries(freq)
      .map(([char, count]) => ({
        character: char === ' ' ? 'Space' : char,
        frequency: Math.round((count / text.length) * 100 * 100) / 100,
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Generate entropy data
    const entropyData = []
    for (let i = 0; i < Math.min(text.length, 50); i += 5) {
      const chunk = text.slice(i, i + 5)
      const chunkFreq: { [key: string]: number } = {}
      for (const char of chunk) {
        chunkFreq[char] = (chunkFreq[char] || 0) + 1
      }
      
      let entropy = 0
      Object.values(chunkFreq).forEach(count => {
        const p = count / chunk.length
        entropy -= p * Math.log2(p)
      })
      
      entropyData.push({
        position: i,
        entropy: Math.round(entropy * 100) / 100
      })
    }

    // Generate security metrics
    const securityMetrics = {
      overall: calculateOverallSecurity(text, cipherState),
      entropy: calculateEntropy(text),
      keyStrength: calculateKeyStrength(cipherState.key),
      algorithmStrength: getAlgorithmStrength(cipherState.algorithm),
      patterns: detectPatterns(text).length
    }

    // Generate bit distribution
    const bitDistribution = generateBitDistribution(text)

    return {
      frequencyData,
      entropyData,
      securityMetrics,
      bitDistribution,
      textLength: text.length,
      uniqueChars: Object.keys(freq).length
    }
  }

  const calculateEntropy = (text: string): number => {
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
    score += Math.min(50, key.length * 2)
    score += /[a-z]/.test(key) ? 10 : 0
    score += /[A-Z]/.test(key) ? 10 : 0
    score += /[0-9]/.test(key) ? 10 : 0
    score += /[^a-zA-Z0-9]/.test(key) ? 20 : 0
    
    return Math.min(100, score)
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

  const calculateOverallSecurity = (text: string, state: CipherState): number => {
    const entropy = calculateEntropy(text)
    const keyStrength = calculateKeyStrength(state.key)
    const algStrength = getAlgorithmStrength(state.algorithm)
    
    return Math.round((entropy * 10 + keyStrength + algStrength) / 3)
  }

  const detectPatterns = (text: string): string[] => {
    const patterns: string[] = []
    const chunks = text.match(/.{1,4}/g) || []
    const frequency: { [key: string]: number } = {}
    
    chunks.forEach(chunk => {
      frequency[chunk] = (frequency[chunk] || 0) + 1
    })

    Object.entries(frequency).forEach(([pattern, count]) => {
      if (count > 1) {
        patterns.push(pattern)
      }
    })

    return patterns
  }

  const generateBitDistribution = (text: string) => {
    const distribution = Array(8).fill(0)
    
    for (const char of text) {
      const charCode = char.charCodeAt(0)
      for (let i = 0; i < 8; i++) {
        if (charCode & (1 << i)) {
          distribution[i]++
        }
      }
    }
    
    return distribution.map((count, index) => ({
      bit: `Bit ${index}`,
      count,
      percentage: Math.round((count / text.length) * 100)
    }))
  }

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316']

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analysis dashboard...</p>
        </CardContent>
      </Card>
    )
  }

  if (!dashboardData) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            No data to analyze. Encrypt or decrypt some text to see comprehensive analysis.
          </p>
          <Button onClick={loadDashboardData} variant="outline">
            Refresh Dashboard
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Security Score"
          value={`${dashboardData.securityMetrics.overall}%`}
          icon={Shield}
          className={dashboardData.securityMetrics.overall >= 80 ? 'text-green-500' : dashboardData.securityMetrics.overall >= 60 ? 'text-yellow-500' : 'text-red-500'}
        />
        <StatCard
          title="Entropy"
          value={`${dashboardData.securityMetrics.entropy}`}
          icon={Activity}
          description="Randomness measure"
        />
        <StatCard
          title="Text Length"
          value={dashboardData.textLength.toLocaleString()}
          icon={Eye}
          description="Characters"
        />
        <StatCard
          title="Unique Chars"
          value={dashboardData.uniqueChars}
          icon={TrendingUp}
          description="Character variety"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Character Frequency Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Character Frequency</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.frequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="character" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="frequency" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Entropy Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Entropy Distribution</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.entropyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="position" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="entropy" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bit Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Bit Distribution</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={dashboardData.bitDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={30}
                  dataKey="count"
                >
                  {dashboardData.bitDistribution.map((_: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: data.fill }}
                            />
                            <span className="font-semibold text-foreground">{data.bit}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Count: <span className="font-medium text-foreground">{data.count}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Percentage: <span className="font-medium text-foreground">{data.percentage}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Security Radar */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Security Analysis</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={[
                { metric: 'Entropy', value: dashboardData.securityMetrics.entropy * 10 },
                { metric: 'Key Strength', value: dashboardData.securityMetrics.keyStrength },
                { metric: 'Algorithm', value: dashboardData.securityMetrics.algorithmStrength },
                { metric: 'Pattern Resistance', value: Math.max(0, 100 - dashboardData.securityMetrics.patterns * 10) },
                { metric: 'Overall Security', value: dashboardData.securityMetrics.overall }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" fontSize={12} />
                <PolarRadiusAxis domain={[0, 100]} fontSize={10} />
                <Radar
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pattern Detection */}
      {dashboardData.securityMetrics.patterns > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Pattern Detection Alert</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="font-medium">Repeating patterns detected</div>
                <div className="text-sm text-muted-foreground">
                  Found {dashboardData.securityMetrics.patterns} repeating patterns in the analyzed text.
                  This may indicate potential vulnerabilities in the encryption.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AnalysisDashboard
