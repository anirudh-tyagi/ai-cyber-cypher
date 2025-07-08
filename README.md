# 🔐 CyberCipher - AI-Enhanced Cryptographic Analysis Platform

> **A modern, professional-grade cryptographic analysis and visualization tool designed for security professionals, researchers, and developers.**

🌐 **[Live Demo on Vercel →](https://your-deployed-url.vercel.app)**

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)

## 📸 Application Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./screenshots/dashboard-overview.png" alt="Dashboard Overview" width="400px" />
        <br /><em>🎛️ Main Dashboard Interface</em>
      </td>
      <td align="center">
        <img src="./screenshots/cipher-engine.png" alt="Cipher Engine" width="400px" />
        <br /><em>⚙️ Cipher Engine Operations</em>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="./screenshots/security-analysis.png" alt="Security Analysis" width="400px" />
        <br /><em>🛡️ Security Analysis Dashboard</em>
      </td>
      <td align="center">
        <img src="./screenshots/data-visualization.png" alt="Data Visualization" width="400px" />
        <br /><em>📊 Interactive Data Visualizations</em>
      </td>
    </tr>
  </table>
</div>

## � Live Demo

**🌐 [View Live Application](https://your-app-name.vercel.app)** - *Deployed on Vercel*

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
        <img src="screenshots/analytics.png" alt="3" width="100%"/>
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

## 🏗️ Architecture Overview

```
CyberCipher/
├── 🎨 Frontend (React/TypeScript)
│   ├── 🖥️  Modern Dashboard Interface
│   ├── 📊 Interactive Data Visualizations
│   ├── 🔧 Modular Component Architecture
│   └── 🎯 Real-time State Management
│
├── ⚙️  Backend (FastAPI/Python)
│   ├── 🔐 Cryptographic Operations
│   ├── 📈 Security Analysis Engine
│   ├── 🔑 Key Generation Services
│   └── 📡 RESTful API Endpoints
│
└── 🔗 Integration Layer
    ├── 🌐 HTTP API Communication
    ├── 🔄 Real-time Data Sync
    └── ❌ Error Handling & Fallbacks
```

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
   git clone <repository-url>
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

## 🌐 API Architecture

### 🔧 **Backend Endpoints**

#### **Health Check**
```http
GET /health
Response: {"status": "healthy", "timestamp": "2025-07-09T..."}
```

#### **Key Generation**
```http
POST /keys/generate
Content-Type: application/json

Request Body:
{
  "length": 32,
  "key_type": "random",
  "entropy": 256,
  "include_symbols": true,
  "quantum_safe": true
}

Response:
{
  "key": "c9m%-6MoPV_gMG]?+e+6M4zV>_2$iG0&",
  "strength": 84.0,
  "length": 32,
  "key_type": "random"
}
```

#### **Encryption**
```http
POST /cipher/encrypt
Content-Type: application/json

Request Body:
{
  "text": "Hello World",
  "key": "mySecretKey",
  "algorithm": "rc4",
  "mode": "encrypt"
}

Response:
{
  "result": "2f4a8b9c1d...",  // Hex-encoded result
  "algorithm": "rc4",
  "mode": "encrypt"
}
```

#### **Decryption**
```http
POST /cipher/decrypt
Content-Type: application/json

Request Body:
{
  "text": "2f4a8b9c1d...",
  "key": "mySecretKey",
  "algorithm": "rc4",
  "mode": "decrypt"
}

Response:
{
  "result": "Hello World",
  "algorithm": "rc4",
  "mode": "decrypt"
}
```

#### **Security Analysis**
```http
POST /analysis/analyze
Content-Type: application/json

Request Body:
{
  "text": "encrypted_data_here",
  "key": "optional_key",
  "algorithm": "optional_algorithm"
}

Response:
{
  "entropy": 4.2,
  "strength": {
    "overall": 85,
    "entropy": 42,
    "key_strength": 68,
    "algorithm_strength": 60
  },
  "vulnerabilities": ["Weak key detected"],
  "recommendations": ["Use a longer, more complex key"]
}
```

---

## 🎨 UI/UX Features

### **Modern Design System**
- **🎨 Consistent Theme**: Professional dark theme with accent colors
- **📱 Responsive Design**: Mobile-first approach with breakpoints
- **⚡ Smooth Animations**: Framer Motion powered transitions
- **🎯 Intuitive Navigation**: Tab-based dashboard navigation
- **🔄 Real-time Feedback**: Toast notifications and live updates

### **Interactive Components**
- **📊 Dynamic Charts**: Recharts-powered visualizations
- **🖱️ Hover Effects**: Enhanced user interaction
- **📋 Copy-to-Clipboard**: One-click key/result copying
- **⌨️ Keyboard Shortcuts**: Power user support
- **🎛️ Progressive Enhancement**: Features work without JavaScript

### **Accessibility**
- **♿ WCAG Compliant**: Proper contrast ratios and semantic HTML
- **⌨️ Keyboard Navigation**: Full keyboard accessibility
- **📖 Screen Reader Support**: ARIA labels and descriptions
- **🔍 Focus Management**: Clear focus indicators

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

---

## 🧪 Testing & Quality Assurance

### **Testing Strategy**
- **🔧 Unit Tests**: Component and function testing
- **🧩 Integration Tests**: API endpoint testing
- **🖥️ E2E Tests**: Full user workflow testing
- **🔒 Security Tests**: Vulnerability assessments

### **Code Quality**
- **📏 ESLint**: Code style enforcement
- **🎯 TypeScript**: Type safety and intellisense
- **📝 Code Documentation**: Comprehensive inline documentation
- **🔄 CI/CD Ready**: GitHub Actions compatible

---

## 🔧 Development Guide

### **Adding New Cipher Algorithms**

1. **Backend Implementation**:
   ```python
   # Add to main.py
   def new_algorithm_encrypt(text: str, key: str) -> str:
       # Implement encryption logic
       return encrypted_result
   ```

2. **Frontend Integration**:
   ```typescript
   // Add to CipherEngine.tsx
   const algorithms = {
     'new-algo': 'New Algorithm Name'
   }
   ```

### **Creating New Visualizations**

1. **Data Processing**:
   ```typescript
   const generateNewVisualizationData = (text: string) => {
     // Process text and return chart data
     return chartData
   }
   ```

2. **Chart Component**:
   ```tsx
   <ResponsiveContainer width="100%" height={300}>
     <NewChartType data={data}>
       <Tooltip contentStyle={tooltipStyle} />
     </NewChartType>
   </ResponsiveContainer>
   ```

### **Environment Configuration**

```bash
# Development
NODE_ENV=development
VITE_API_URL=http://localhost:8001

# Production
NODE_ENV=production
VITE_API_URL=https://your-api-domain.com
```

---

## 📚 Educational Resources

### **Cryptography Concepts**
- **🔐 Stream vs Block Ciphers**: Understanding different encryption types
- **📊 Entropy & Randomness**: Information theory applications
- **🔑 Key Management**: Best practices for key generation and storage
- **🛡️ Security Analysis**: Vulnerability assessment techniques

### **Implementation Examples**
- **🎲 Random Number Generation**: Cryptographically secure methods
- **📈 Statistical Analysis**: Frequency and pattern analysis
- **🔄 Algorithm Comparison**: Security vs performance trade-offs
- **📊 Data Visualization**: Representing cryptographic data

---

### **Development Setup**
```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Run tests
npm test
python -m pytest

# Start development servers
npm run dev        # Frontend
python main.py     # Backend
```

---
