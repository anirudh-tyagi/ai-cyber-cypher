from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import secrets
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="CyberCipher API",
    description="Essential cryptographic API for CyberCipher",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3006", "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Essential Models
class KeyGenerationRequest(BaseModel):
    length: int = 32
    key_type: str = "random"
    entropy: int = 256
    include_symbols: bool = True
    quantum_safe: bool = True

class KeyGenerationResponse(BaseModel):
    key: str
    strength: float
    length: int
    key_type: str

class CipherRequest(BaseModel):
    text: str
    key: str
    algorithm: str = "rc4"
    mode: str = "encrypt"

class CipherResponse(BaseModel):
    result: str
    algorithm: str
    mode: str

class AnalysisRequest(BaseModel):
    text: str
    key: Optional[str] = None
    algorithm: Optional[str] = None

class AnalysisResponse(BaseModel):
    entropy: float
    strength: dict
    vulnerabilities: list
    recommendations: list

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# Key generation
@app.post("/keys/generate", response_model=KeyGenerationResponse)
async def generate_key(request: KeyGenerationRequest):
    try:
        # Generate cryptographically secure key
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        if request.include_symbols:
            charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
        
        # Use secrets for cryptographic randomness
        key = ''.join(secrets.choice(charset) for _ in range(request.length))
        
        # Calculate strength
        strength = min(100, request.length * 2 + (20 if request.include_symbols else 0))
        
        return KeyGenerationResponse(
            key=key,
            strength=strength,
            length=len(key),
            key_type=request.key_type
        )
    except Exception as e:
        logger.error(f"Key generation error: {e}")
        raise HTTPException(status_code=500, detail="Key generation failed")

# Simple cipher operations
@app.post("/cipher/encrypt", response_model=CipherResponse)
async def encrypt_text(request: CipherRequest):
    try:
        # Simple XOR encryption for demo
        result = ""
        key_len = len(request.key)
        for i, char in enumerate(request.text):
            key_char = request.key[i % key_len]
            encrypted_char = chr(ord(char) ^ ord(key_char))
            result += encrypted_char
        
        # Convert to hex for display
        hex_result = ''.join(f'{ord(c):02x}' for c in result)
        
        return CipherResponse(
            result=hex_result,
            algorithm=request.algorithm,
            mode="encrypt"
        )
    except Exception as e:
        logger.error(f"Encryption error: {e}")
        raise HTTPException(status_code=500, detail="Encryption failed")

@app.post("/cipher/decrypt", response_model=CipherResponse)
async def decrypt_text(request: CipherRequest):
    try:
        # Convert from hex
        hex_pairs = [request.text[i:i+2] for i in range(0, len(request.text), 2)]
        encrypted_bytes = ''.join(chr(int(pair, 16)) for pair in hex_pairs if pair)
        
        # Simple XOR decryption
        result = ""
        key_len = len(request.key)
        for i, char in enumerate(encrypted_bytes):
            key_char = request.key[i % key_len]
            decrypted_char = chr(ord(char) ^ ord(key_char))
            result += decrypted_char
        
        return CipherResponse(
            result=result,
            algorithm=request.algorithm,
            mode="decrypt"
        )
    except Exception as e:
        logger.error(f"Decryption error: {e}")
        raise HTTPException(status_code=500, detail="Decryption failed")

# Text analysis
@app.post("/analysis/analyze", response_model=AnalysisResponse)
async def analyze_text(request: AnalysisRequest):
    try:
        text = request.text
        
        # Calculate entropy
        if not text:
            entropy = 0.0
        else:
            char_counts = {}
            for char in text:
                char_counts[char] = char_counts.get(char, 0) + 1
            
            entropy = 0.0
            text_length = len(text)
            for count in char_counts.values():
                probability = count / text_length
                if probability > 0:
                    entropy -= probability * (probability.bit_length() - 1)
        
        # Calculate strength metrics
        key_strength = len(request.key or "") * 2 if request.key else 0
        algorithm_strengths = {"rc4": 60, "chacha20": 90, "aes": 85}
        algo_strength = algorithm_strengths.get(request.algorithm or "rc4", 50)
        
        strength = {
            "overall": min(100, (entropy * 10 + key_strength + algo_strength) / 3),
            "entropy": entropy,
            "key_strength": key_strength,
            "algorithm_strength": algo_strength
        }
        
        # Generate basic recommendations
        vulnerabilities = []
        recommendations = []
        
        if key_strength < 50:
            vulnerabilities.append("Weak key detected")
            recommendations.append("Use a longer, more complex key")
        
        if entropy < 3:
            vulnerabilities.append("Low entropy in text")
            recommendations.append("Ensure input has sufficient randomness")
        
        return AnalysisResponse(
            entropy=round(entropy, 2),
            strength=strength,
            vulnerabilities=vulnerabilities,
            recommendations=recommendations
        )
    except Exception as e:
        logger.error(f"Analysis error: {e}")
        raise HTTPException(status_code=500, detail="Analysis failed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
