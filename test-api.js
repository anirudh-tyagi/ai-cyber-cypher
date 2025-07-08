// Quick test script to verify API connectivity
const API_BASE_URL = 'http://localhost:8001';
const API_KEY = 'dev-api-key-2024';

async function testKeyGeneration() {
  try {
    console.log('Testing key generation...');
    
    const response = await fetch(`${API_BASE_URL}/keys/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        length: 32,
        key_type: 'random',
        entropy: 256,
        include_symbols: true,
        quantum_safe: true,
      }),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Success! Generated key:', data);
    return data;
  } catch (error) {
    console.error('API test failed:', error);
    throw error;
  }
}

// Run the test
testKeyGeneration()
  .then(result => {
    console.log('✅ API test passed!');
    process.exit(0);
  })
  .catch(error => {
    console.log('❌ API test failed!');
    process.exit(1);
  });
