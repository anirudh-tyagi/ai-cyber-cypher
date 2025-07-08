import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Key, Shield, BarChart3 } from 'lucide-react'
import { CipherState, AnalysisResults } from '../types/cipher'
import { Card, CardContent } from './ui/Card'
import { Button } from './ui/Button'
import KeyGeneratorPanel from './KeyGeneratorPanel'
import CipherEngine from './CipherEngine'
import SecurityAnalyzer from './SecurityAnalyzer'
import AnalysisDashboard from './AnalysisDashboard'

interface DashboardProps {
  cipherState: CipherState
  onStateChange: (state: CipherState) => void
}

type ActiveTab = 'generator' | 'cipher' | 'analyzer' | 'visualization'

const Dashboard: React.FC<DashboardProps> = ({ cipherState, onStateChange }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('generator')

  const tabs = [
    { id: 'generator', label: 'Key Generator', icon: Key },
    { id: 'cipher', label: 'Cipher Engine', icon: Settings },
    { id: 'analyzer', label: 'Security Analyzer', icon: Shield },
    { id: 'visualization', label: 'Analysis Dashboard', icon: BarChart3 }
  ]

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'generator':
        return (
          <KeyGeneratorPanel 
            onKeyGenerated={(key) => onStateChange({ ...cipherState, key })}
            currentKey={cipherState.key}
          />
        )
      case 'cipher':
        return (
          <CipherEngine 
            cipherState={cipherState}
            onStateChange={onStateChange}
          />
        )
      case 'analyzer':
        return (
          <SecurityAnalyzer 
            cipherState={cipherState}
            onAnalysisComplete={(results: AnalysisResults) => 
              onStateChange({ ...cipherState, analysisResults: results })
            }
          />
        )
      case 'visualization':
        return <AnalysisDashboard cipherState={cipherState} />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className="flex items-center space-x-2 min-w-fit"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Component */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px]"
      >
        {renderActiveComponent()}
      </motion.div>

      {/* Status Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-500 font-medium">● Active</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Algorithm:</span>
              <span className="font-medium">{cipherState.algorithm.toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Mode:</span>
              <span className="font-medium capitalize">{cipherState.mode}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Key Length:</span>
              <span className="font-medium">{cipherState.key.length} chars</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
