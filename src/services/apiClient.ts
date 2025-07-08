// Essential API client for CyberCipher backend
const API_BASE_URL = 'http://localhost:8001';
const API_KEY = 'dev-api-key-2024';

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Core cipher operations
  async encrypt(text: string, key: string, algorithm: string = 'rc4') {
    return this.request('/cipher/encrypt', {
      method: 'POST',
      body: JSON.stringify({ text, key, algorithm, mode: 'encrypt' }),
    });
  }

  async decrypt(text: string, key: string, algorithm: string = 'rc4') {
    return this.request('/cipher/decrypt', {
      method: 'POST',
      body: JSON.stringify({ text, key, algorithm, mode: 'decrypt' }),
    });
  }

  // Key generation
  async generateKey(length: number = 32, keyType: string = 'random') {
    return this.request('/keys/generate', {
      method: 'POST',
      body: JSON.stringify({
        length,
        key_type: keyType,
        entropy: 256,
        include_symbols: true,
        quantum_safe: true,
      }),
    });
  }

  // Text analysis
  async analyzeText(text: string, key?: string, algorithm?: string) {
    return this.request('/analysis/analyze', {
      method: 'POST',
      body: JSON.stringify({ text, key, algorithm }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
