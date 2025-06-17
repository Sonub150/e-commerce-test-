import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';

function DebugInfo() {
  const { backendUrl } = useContext(AppContext);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testBackendConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing...');
    
    try {
      console.log('Testing backend connection to:', backendUrl);
      
      // Test 1: Basic connection
      const response = await axios.get(`${backendUrl}/api/auth/user-authenticated`, {
        withCredentials: true
      });
      
      setTestResult(`✅ Backend is reachable! Status: ${response.status}`);
      console.log('Backend test response:', response);
      
    } catch (error) {
      console.error('Backend test error:', error);
      setTestResult(`❌ Backend connection failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testPasswordReset = async () => {
    setIsLoading(true);
    setTestResult('Testing password reset...');
    
    try {
      console.log('Testing password reset for:', testEmail);
      
      const response = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, {
        email: testEmail
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setTestResult(`✅ Password reset OTP sent! Response: ${JSON.stringify(response.data)}`);
      console.log('Password reset test response:', response);
      
    } catch (error) {
      console.error('Password reset test error:', error);
      setTestResult(`❌ Password reset failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '10px',
      maxWidth: '400px',
      zIndex: 1000
    }}>
      <h3>🔧 Debug Info</h3>
      <p><strong>Backend URL:</strong> {backendUrl || 'Not set'}</p>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="email"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          placeholder="Test email"
          style={{ 
            width: '100%', 
            padding: '5px', 
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      
      <button 
        onClick={testBackendConnection}
        disabled={isLoading}
        style={{ 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          padding: '8px 12px', 
          borderRadius: '5px',
          marginRight: '10px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        Test Backend
      </button>
      
      <button 
        onClick={testPasswordReset}
        disabled={isLoading}
        style={{ 
          background: '#28a745', 
          color: 'white', 
          border: 'none', 
          padding: '8px 12px', 
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        Test Reset
      </button>
      
      <div style={{ 
        marginTop: '10px', 
        padding: '10px', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '5px',
        fontSize: '12px'
      }}>
        <strong>Result:</strong><br/>
        {testResult}
      </div>
    </div>
  );
}

export default DebugInfo; 