# 🔐 CyberCipher - AI-Enhanced Cryptographic Analysis Platform

> **A modern, professional-grade cryptographic analysis and visualization tool designed for security professionals, researchers, and developers.**

🌐 **[Live Demo on Vercel →](https://your-deployed-url.vercel.app)**

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="screenshots/1.png" alt="Main Dashboard" width="100%"/>
        <p align="center"><em>Main Dashboard Interface</em></p>
      </td>
      <td width="50%">
        <img src="screenshots/2.png" alt="Key Generator" width="100%"/>
        <p align="center"><em>Encryption/Decryption Engine</em></p>
      </td>
    </tr>
    <tr>
      <td width="50%">
        <img src="screenshots/3.png" alt="Cipher Engine" width="100%"/>
        <p align="center"><em>Security Analyzer</em></p>
      </td>
      <td width="50%">
        <img src="screenshots/4.png" alt="3" width="100%"/>
        <p align="center"><em>Interactive Analytics Dashboard</em></p>
      </td>
    </tr>
  </table>
</div>

---

CyberCipher is a comprehensive cryptographic analysis platform that combines modern web technologies with advanced cryptographic algorithms. Built with React/TypeScript frontend and FastAPI backend, it provides real-time encryption/decryption, security analysis, and interactive visualizations for understanding cipher behavior and security metrics.

### 🎯 Key Features

- **🔑 Advanced Key Generation** - Cryptographically secure key generation with multiple algorithms
- **🔒 Multi-Algorithm Cipher Engine** - Support for RC4, AES, XOR, and custom ciphers
- **📊 Real-Time Security Analysis** - Comprehensive entropy, pattern, and vulnerability analysis
- **📈 Interactive Visualizations** - Dynamic charts for bit distribution, frequency analysis, and security metrics
- **🌐 Professional UI/UX** - Modern, responsive dashboard with dark/light theme support
- **⚡ Live Processing** - Real-time encryption/decryption with immediate feedback

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **Python** 3.13+
- **npm** or **yarn**
- **Git**

### 🔧 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <https://github.com/anirudh-tyagi/ai-cyber-cypher>
   cd ai-cyber-cypher
   ```

2. **Backend Setup**
   ```bash
   # Create Python virtual environment
   python -m venv cybercypher
   
   # Activate virtual environment
   # macOS/Linux:
   source cybercypher/bin/activate
   # Windows:
   cybercypher\Scripts\activate
   
   # Install Python dependencies
   pip install fastapi uvicorn python-multipart pydantic
   ```

3. **Frontend Setup**
   ```bash
   # Install Node.js dependencies
   npm install
   
   # Install additional packages if needed
   npm install framer-motion lucide-react recharts react-hot-toast
   ```

4. **Start the Application**
   ```bash
   # Terminal 1: Start Backend (Port 8001)
   cd backend
   python main.py
   
   # Terminal 2: Start Frontend (Port 3006)
   npm run dev
   ```

5. **Access the Application**
   - **Frontend**: http://localhost:3006
   - **Backend API**: http://localhost:8001
   - **API Documentation**: http://localhost:8001/docs

---

## 🏢 Application Structure

### 📁 Frontend Structure (`/src`)

```
src/
├── components/
│   ├── 🎛️  Dashboard.tsx           # Main dashboard with tab navigation
│   ├── 🔑 KeyGeneratorPanel.tsx    # Advanced key generation interface
│   ├── ⚙️  CipherEngine.tsx        # Encryption/decryption operations
│   ├── 🛡️  SecurityAnalyzer.tsx    # Security analysis tools
│   ├── 📊 AnalysisDashboard.tsx    # Data visualization dashboard
│   ├── 📈 VisualizationDashboard.tsx # Interactive charts & graphs
│   ├── 🎨 Header.tsx              # Application header
│   └── ui/                        # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Progress.tsx
│       └── StatCard.tsx
├── services/
│   └── 🌐 apiClient.ts            # API communication layer
├── types/
│   └── 📋 cipher.ts               # TypeScript type definitions
└── utils/
    └── 🔧 cn.ts                   # Utility functions
```

### 📁 Backend Structure (`/backend`)

```
backend/
├── 📄 main.py                     # FastAPI application entry point
├── 🔐 Key Generation Endpoints    # /keys/generate
├── ⚙️  Cipher Operation Endpoints  # /cipher/encrypt, /cipher/decrypt
├── 📊 Analysis Endpoints          # /analysis/analyze
└── ❤️  Health Check               # /health
```

---

## 🎛️ Dashboard Components

### 1. 🔑 **Key Generator Panel**

**Purpose**: Generate cryptographically secure keys for encryption operations.

**Features**:
- **Multiple Key Types**: Random, Quantum-Safe, AI-Enhanced
- **Configurable Length**: 8-512 characters
- **Entropy Levels**: 128-bit, 256-bit, 512-bit
- **Character Sets**: Include/exclude symbols
- **Strength Analysis**: Real-time security assessment
- **API Integration**: Primary backend generation with local fallback

**How It Works**:
```typescript
// API-first approach with fallback
try {
  const response = await apiClient.generateKey(length, type)
  // Use API-generated key
} catch (error) {
  // Fallback to local crypto.getRandomValues()
  const localKey = generateLocalKey(options)
}
```

### 2. ⚙️ **Cipher Engine**

**Purpose**: Perform encryption and decryption operations with multiple algorithms.

**Supported Algorithms**:
- **RC4**: Stream cipher with variable key length
- **AES**: Advanced Encryption Standard (simulated)
- **XOR**: Simple XOR cipher for educational purposes
- **Custom**: Extensible for additional algorithms

**Features**:
- **Real-time Processing**: Instant encryption/decryption
- **Algorithm Selection**: Dynamic cipher switching
- **Mode Support**: Encrypt/Decrypt modes
- **Input Validation**: Real-time error checking
- **Output Formatting**: Hex encoding for binary data

### 3. 🛡️ **Security Analyzer**

**Purpose**: Analyze the security characteristics of encrypted and plaintext data.

**Analysis Types**:
- **Entropy Calculation**: Information theory metrics
- **Pattern Detection**: Repeating sequence identification
- **Frequency Analysis**: Character distribution analysis
- **Vulnerability Assessment**: Common weakness detection
- **Strength Scoring**: Overall security rating

**Metrics Provided**:
```typescript
interface AnalysisResults {
  entropy: number              // Shannon entropy
  strength: {
    overall: number           // Combined security score
    entropy: number          // Entropy component
    keyStrength: number      // Key quality assessment
    algorithmStrength: number // Algorithm security rating
  }
  vulnerabilities: string[]   // Identified weaknesses
  recommendations: string[]   // Security improvements
}
```

### 4. 📊 **Analysis Dashboard**

**Purpose**: Provide comprehensive data visualization and security metrics.

**Visualization Components**:

#### **Character Frequency Analysis**
- **Type**: Interactive Bar Chart
- **Data**: Character occurrence distribution
- **Insights**: Pattern identification, language detection
- **Features**: Hover tooltips, responsive design

#### **Entropy Distribution**
- **Type**: Line Chart
- **Data**: Entropy variation across text segments
- **Insights**: Randomness distribution, weak spots
- **Features**: Real-time updates, trend analysis

#### **Bit Distribution**
- **Type**: Enhanced Pie Chart
- **Data**: Binary bit pattern analysis (Bit 0-7)
- **Insights**: Byte-level randomness assessment
- **Features**: External labels, interactive legend

#### **Algorithm Comparison**
- **Type**: Multi-series Bar Chart
- **Data**: Security, Performance, Quantum Resistance
- **Insights**: Algorithm selection guidance
- **Features**: Comparative analysis, current algorithm highlighting

#### **Security Metrics Overview**
- **Type**: Stat Cards Grid
- **Data**: Key metrics summary
- **Metrics**: Overall score, entropy, randomness, AI insights
- **Features**: Color-coded indicators, trend visualization

---

## 🔒 Security Features

### **Cryptographic Security**
- **🎲 Secure Random Generation**: Uses `crypto.getRandomValues()`
- **🔐 Industry Standards**: Implements established algorithms
- **🛡️ Input Validation**: Comprehensive input sanitization
- **🔑 Key Management**: Secure key handling practices

### **Application Security**
- **🌐 CORS Protection**: Configured for allowed origins
- **🔒 API Authentication**: Bearer token authentication
- **❌ Error Handling**: Secure error messages
- **📝 Logging**: Comprehensive audit trails

### **Data Protection**
- **🚫 No Data Persistence**: Keys and data are not stored
- **🔄 Memory Management**: Proper cleanup of sensitive data
- **🌐 Secure Communication**: HTTPS ready
- **🎭 Privacy by Design**: Minimal data collection

---

## 🚀 Performance Optimizations

### **Frontend Optimizations**
- **⚡ Code Splitting**: Lazy loading of components
- **🗜️ Bundle Optimization**: Tree shaking and minification
- **🎨 CSS Optimization**: Tailwind CSS purging
- **📱 Mobile Performance**: Optimized for mobile devices

### **Backend Optimizations**
- **🚀 FastAPI Performance**: Async/await patterns
- **📊 Efficient Algorithms**: Optimized cryptographic operations
- **🔄 Memory Management**: Proper resource cleanup
- **📈 Scalable Architecture**: Horizontal scaling ready

---

## 🚀 Deployment

### 📂 **GitHub Repository**

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CyberCipher application"
   ```

2. **Create GitHub Repository**
   ```bash
   # Create repository on GitHub, then:
   git remote add origin https://github.com/anirudh-tyagi/cybercypher.git
   git branch -M main
   git push -u origin main
   ```

### ⚡ **Vercel Deployment**

1. **Frontend Deployment**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

2. **Environment Variables** (Add in Vercel Dashboard)
   ```env
   VITE_API_URL=https://your-backend-url.com
   NODE_ENV=production
   ```

3. **Build Configuration** (vercel.json)
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

### 🐳 **Backend Deployment Options**

- **Railway**: `railway up`
- **Render**: Connect GitHub repo
- **Heroku**: `git push heroku main`
- **DigitalOcean App Platform**: Connect via GitHub
