import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Activity, BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react'
import { CipherState } from '../types/cipher'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Badge } from './ui/Badge'
import { StatCard } from './ui/StatCard'
import { DecryptedText } from './ui'

interface VisualizationDashboardProps {
  cipherState: CipherState
}

const VisualizationDashboard: React.FC<VisualizationDashboardProps> = ({ cipherState }) => {
  // Generate frequency data for the current text
  const generateFrequencyData = (text: string) => {
    if (!text) return []
    
    const freq: { [key: string]: number } = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }
    
    return Object.entries(freq)
      .map(([char, count]) => ({
        character: char.length === 1 && char.charCodeAt(0) < 128 ? char : char.charCodeAt(0).toString(16),
        frequency: count,
        percentage: (count / text.length) * 100
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 20)
  }

  // Generate entropy visualization data
  const generateEntropyData = (text: string) => {
    if (!text) return []
    
    const windowSize = Math.max(1, Math.floor(text.length / 50))
    const data = []
    
    for (let i = 0; i < text.length - windowSize; i += windowSize) {
      const window = text.substring(i, i + windowSize)
      const entropy = calculateWindowEntropy(window)
      data.push({
        position: i,
        entropy: entropy,
        localEntropy: entropy
      })
    }
    
    return data
  }

  // Generate bit distribution data
  const generateBitDistribution = (text: string) => {
    if (!text) return []
    
    const bitCounts = [0, 0, 0, 0, 0, 0, 0, 0]
    
    for (const char of text) {
      const charCode = char.charCodeAt(0)
      for (let i = 0; i < 8; i++) {
        if (charCode & (1 << i)) {
          bitCounts[i]++
        }
      }
    }
    
    return bitCounts.map((count, index) => ({
      bit: `Bit ${index}`,
      value: count,
      percentage: (count / text.length) * 100
    }))
  }

  const calculateWindowEntropy = (text: string): number => {
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

  // Algorithm comparison data
  const algorithmComparisonData = [
    { name: 'AES', security: 95, performance: 90, quantumResistance: 30 },
    { name: 'RC4', security: 60, performance: 95, quantumResistance: 20 },
    { name: 'XOR', security: 40, performance: 100, quantumResistance: 15 },
    { name: 'Vigenère', security: 50, performance: 85, quantumResistance: 25 },
  ]

  // Custom label renderer for better visibility
  const renderCustomizedLabel = ({
    cx, cy, midAngle, outerRadius, bit, percentage
  }: any) => {
    const RADIAN = Math.PI / 180;
    // Position labels outside the pie chart for better visibility
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show labels for segments larger than 5% to avoid clutter
    if (percentage < 5) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="hsl(var(--foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="11"
        fontWeight="500"
        className="drop-shadow-sm"
      >
        {`${bit.replace('Bit ', '')}: ${percentage.toFixed(0)}%`}
      </text>
    );
  };

  const frequencyData = generateFrequencyData(cipherState.outputText || cipherState.inputText)
  const entropyData = generateEntropyData(cipherState.outputText || cipherState.inputText)
  const bitDistribution = generateBitDistribution(cipherState.outputText || cipherState.inputText)

  const COLORS = [
    '#10b981', // emerald-500
    '#3b82f6', // blue-500  
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#f97316'  // orange-500
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center space-x-3 mb-8">
        <Activity className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">
          <DecryptedText 
            text="Cryptographic Analysis Dashboard"
            className="text-2xl font-semibold text-foreground"
            interval={25}
            revealDuration={1800}
          />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Character Frequency Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Character Frequency</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={frequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="character" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    fontSize: '0.875rem',
                    padding: '12px 16px'
                  }}
                  labelStyle={{
                    color: '#ffffff',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}
                  itemStyle={{
                    color: '#e5e7eb',
                    fontWeight: '500'
                  }}
                />
                <Bar dataKey="frequency" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Entropy Visualization */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Entropy Distribution</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={entropyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="position" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    fontSize: '0.875rem',
                    padding: '12px 16px'
                  }}
                  labelStyle={{
                    color: '#ffffff',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}
                  itemStyle={{
                    color: '#e5e7eb',
                    fontWeight: '500'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="entropy" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bit Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Bit Distribution</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={bitDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={85}
                      innerRadius={20}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {bitDistribution.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        fontSize: '0.875rem',
                        padding: '12px 16px',
                        minWidth: '120px'
                      }}
                      formatter={(value: number, name: string) => [
                        `${value} (${((value / (cipherState.outputText || cipherState.inputText).length) * 100).toFixed(1)}%)`,
                        name
                      ]}
                      labelStyle={{
                        color: '#ffffff',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}
                      itemStyle={{
                        color: '#e5e7eb',
                        fontWeight: '500'
                      }}
                      separator=": "
                      labelFormatter={(label) => `${label}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Bit Distribution Legend</h4>
                  {bitDistribution.map((entry, index) => (
                    <div key={entry.bit} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full shadow-sm" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-foreground font-medium">{entry.bit}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-foreground">
                          {entry.percentage.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.value} occurrences
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Comparison */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Algorithm Comparison</h3>
              <Badge variant="outline">Current: {cipherState.algorithm.toUpperCase()}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={algorithmComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    fontSize: '0.875rem',
                    padding: '12px 16px'
                  }}
                  labelStyle={{
                    color: '#ffffff',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}
                  itemStyle={{
                    color: '#e5e7eb',
                    fontWeight: '500'
                  }}
                />
                <Bar dataKey="security" fill="hsl(var(--primary))" name="Security" radius={[2, 2, 0, 0]} />
                <Bar dataKey="performance" fill="#3b82f6" name="Performance" radius={[2, 2, 0, 0]} />
                <Bar dataKey="quantumResistance" fill="#f59e0b" name="Quantum Resistance" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Security Metrics Overview */}
      {cipherState.analysisResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard
            title="Entropy"
            value={`${cipherState.analysisResults.entropy.toFixed(1)} bits`}
            icon={Activity}
            description="Information density"
          />
          <StatCard
            title="Security Score"
            value={`${cipherState.analysisResults.strength.overall}%`}
            icon={TrendingUp}
            description="Overall assessment"
          />
          <StatCard
            title="Randomness"
            value={cipherState.analysisResults.patternAnalysis.randomnessScore.toFixed(2)}
            icon={PieChartIcon}
            description="Pattern analysis"
          />
          <StatCard
            title="AI Insights"
            value={cipherState.analysisResults.aiPredictions.length.toString()}
            icon={BarChart3}
            description="Discovered patterns"
          />
        </motion.div>
      )}
    </motion.div>
  )
}

export default VisualizationDashboard
