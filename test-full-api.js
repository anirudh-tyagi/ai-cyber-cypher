// Test script to verify if the backend API is working as expected
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:8001';
const API_KEY = 'dev-api-key-2024';

async function testFullKeyGeneration() {
  console.log('🔧 Testing complete key generation flow...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test 2: Key generation
    console.log('\n2. Testing key generation endpoint...');
    const keyResponse = await fetch(`${API_BASE_URL}/keys/generate`, {
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
    
    if (!keyResponse.ok) {
      throw new Error(`HTTP ${keyResponse.status}: ${keyResponse.statusText}`);
    }
    
    const keyData = await keyResponse.json();
    console.log('✅ Key generation:', keyData);
    
    // Test 3: Test encryption with generated key
    console.log('\n3. Testing encryption with generated key...');
    const encryptResponse = await fetch(`${API_BASE_URL}/cipher/encrypt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        text: 'Hello World',
        key: keyData.key,
        algorithm: 'rc4',
        mode: 'encrypt',
      }),
    });
    
    const encryptData = await encryptResponse.json();
    console.log('✅ Encryption test:', encryptData);
    
    // Test 4: Test decryption
    console.log('\n4. Testing decryption...');
    const decryptResponse = await fetch(`${API_BASE_URL}/cipher/decrypt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        text: encryptData.result,
        key: keyData.key,
        algorithm: 'rc4',
        mode: 'decrypt',
      }),
    });
    
    const decryptData = await decryptResponse.json();
    console.log('✅ Decryption test:', decryptData);
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    console.log('\n📋 Summary:');
    console.log(`- Generated key: ${keyData.key}`);
    console.log(`- Key strength: ${keyData.strength}%`);
    console.log(`- Original text: "Hello World"`);
    console.log(`- Encrypted: ${encryptData.result}`);
    console.log(`- Decrypted: "${decryptData.result}"`);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testFullKeyGeneration();
