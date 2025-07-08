import CryptoJS from 'crypto-js'

// RC4 Stream Cipher Implementation
export class RC4Cipher {
  private key: number[]
  
  constructor(key: string) {
    this.key = this.initializeKey(key)
  }
  
  private initializeKey(key: string): number[] {
    const keyBytes = CryptoJS.enc.Utf8.parse(key)
    const keyArray = Array.from(keyBytes.sigBytes > 0 ? keyBytes.words : [])
    
    // Initialize state array
    const S = Array.from({ length: 256 }, (_, i) => i)
    
    // Key scheduling algorithm
    let j = 0
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + (keyArray[i % keyArray.length] || 0)) % 256
      // Swap S[i] and S[j]
      ;[S[i], S[j]] = [S[j], S[i]]
    }
    
    return S
  }
  
  encrypt(plaintext: string): string {
    return this.process(plaintext)
  }
  
  decrypt(ciphertext: string): string {
    return this.process(ciphertext)
  }
  
  private process(text: string): string {
    const S = [...this.key] // Copy state array
    let i = 0, j = 0
    let result = ''
    
    for (let k = 0; k < text.length; k++) {
      i = (i + 1) % 256
      j = (j + S[i]) % 256
      
      // Swap S[i] and S[j]
      ;[S[i], S[j]] = [S[j], S[i]]
      
      // Generate keystream byte
      const keystreamByte = S[(S[i] + S[j]) % 256]
      
      // XOR with plaintext/ciphertext
      const char = text.charCodeAt(k)
      const encryptedChar = char ^ keystreamByte
      result += String.fromCharCode(encryptedChar)
    }
    
    return result
  }
  
  generateKeystream(length: number): number[] {
    const S = [...this.key]
    let i = 0, j = 0
    const keystream: number[] = []
    
    for (let k = 0; k < length; k++) {
      i = (i + 1) % 256
      j = (j + S[i]) % 256
      
      ;[S[i], S[j]] = [S[j], S[i]]
      
      keystream.push(S[(S[i] + S[j]) % 256])
    }
    
    return keystream
  }
}

// ChaCha20 Stream Cipher Implementation (simplified)
export class ChaCha20Cipher {
  private key: Uint32Array
  private nonce: Uint32Array
  
  constructor(key: string, nonce?: string) {
    this.key = this.parseKey(key)
    this.nonce = nonce ? this.parseNonce(nonce) : new Uint32Array(3)
  }
  
  private parseKey(key: string): Uint32Array {
    const keyBytes = new TextEncoder().encode(key.padEnd(32, '0').substring(0, 32))
    const keyArray = new Uint32Array(8)
    
    for (let i = 0; i < 8; i++) {
      keyArray[i] = 
        keyBytes[i * 4] |
        (keyBytes[i * 4 + 1] << 8) |
        (keyBytes[i * 4 + 2] << 16) |
        (keyBytes[i * 4 + 3] << 24)
    }
    
    return keyArray
  }
  
  private parseNonce(nonce: string): Uint32Array {
    const nonceBytes = new TextEncoder().encode(nonce.padEnd(12, '0').substring(0, 12))
    const nonceArray = new Uint32Array(3)
    
    for (let i = 0; i < 3; i++) {
      nonceArray[i] = 
        nonceBytes[i * 4] |
        (nonceBytes[i * 4 + 1] << 8) |
        (nonceBytes[i * 4 + 2] << 16) |
        (nonceBytes[i * 4 + 3] << 24)
    }
    
    return nonceArray
  }
  
  encrypt(plaintext: string): string {
    return this.process(plaintext)
  }
  
  decrypt(ciphertext: string): string {
    return this.process(ciphertext)
  }
  
  private process(text: string): string {
    const textBytes = new TextEncoder().encode(text)
    const keystream = this.generateKeystream(textBytes.length)
    const result = new Uint8Array(textBytes.length)
    
    for (let i = 0; i < textBytes.length; i++) {
      result[i] = textBytes[i] ^ keystream[i]
    }
    
    return new TextDecoder().decode(result)
  }
  
  private generateKeystream(length: number): Uint8Array {
    const keystream = new Uint8Array(length)
    let counter = 0
    
    for (let i = 0; i < length; i += 64) {
      const block = this.chachaBlock(counter++)
      const blockBytes = new Uint8Array(block.buffer)
      
      for (let j = 0; j < Math.min(64, length - i); j++) {
        keystream[i + j] = blockBytes[j]
      }
    }
    
    return keystream
  }
  
  private chachaBlock(counter: number): Uint32Array {
    const state = new Uint32Array(16)
    
    // Constants
    state[0] = 0x61707865
    state[1] = 0x3320646e
    state[2] = 0x79622d32
    state[3] = 0x6b206574
    
    // Key
    for (let i = 0; i < 8; i++) {
      state[4 + i] = this.key[i]
    }
    
    // Counter
    state[12] = counter
    
    // Nonce
    for (let i = 0; i < 3; i++) {
      state[13 + i] = this.nonce[i]
    }
    
    const workingState = new Uint32Array(state)
    
    // 20 rounds of ChaCha
    for (let round = 0; round < 20; round += 2) {
      this.quarterRound(workingState, 0, 4, 8, 12)
      this.quarterRound(workingState, 1, 5, 9, 13)
      this.quarterRound(workingState, 2, 6, 10, 14)
      this.quarterRound(workingState, 3, 7, 11, 15)
      
      this.quarterRound(workingState, 0, 5, 10, 15)
      this.quarterRound(workingState, 1, 6, 11, 12)
      this.quarterRound(workingState, 2, 7, 8, 13)
      this.quarterRound(workingState, 3, 4, 9, 14)
    }
    
    // Add original state
    for (let i = 0; i < 16; i++) {
      workingState[i] = (workingState[i] + state[i]) >>> 0
    }
    
    return workingState
  }
  
  private quarterRound(state: Uint32Array, a: number, b: number, c: number, d: number): void {
    state[a] = (state[a] + state[b]) >>> 0
    state[d] = this.rotateLeft(state[d] ^ state[a], 16)
    
    state[c] = (state[c] + state[d]) >>> 0
    state[b] = this.rotateLeft(state[b] ^ state[c], 12)
    
    state[a] = (state[a] + state[b]) >>> 0
    state[d] = this.rotateLeft(state[d] ^ state[a], 8)
    
    state[c] = (state[c] + state[d]) >>> 0
    state[b] = this.rotateLeft(state[b] ^ state[c], 7)
  }
  
  private rotateLeft(value: number, bits: number): number {
    return ((value << bits) | (value >>> (32 - bits))) >>> 0
  }
}

// Factory function to create cipher instances
export function createCipher(algorithm: string, key: string) {
  switch (algorithm.toLowerCase()) {
    case 'rc4':
      return new RC4Cipher(key)
    case 'chacha20':
      return new ChaCha20Cipher(key)
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`)
  }
}

// Cipher metadata
export const CIPHER_ALGORITHMS = {
  rc4: {
    name: 'RC4',
    id: 'rc4',
    keySize: 256,
    description: 'Variable key-size stream cipher',
    strength: 'medium' as const
  },
  chacha20: {
    name: 'ChaCha20',
    id: 'chacha20',
    keySize: 256,
    description: 'Modern stream cipher by Daniel J. Bernstein',
    strength: 'high' as const
  }
}
