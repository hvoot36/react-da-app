import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [boxPosition, setBoxPosition] = useState({ x: 100, y: 100 }); // Fixed starting position

  useEffect(() => {
    generateCaptcha(); // Generate captcha when component mounts
  }, []);

  const generateCaptcha = () => {
    const captcha = Math.random().toString(36).slice(2, 8).toUpperCase();
    setGeneratedCaptcha(captcha);
  };

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    if (captchaValue !== generatedCaptcha) {
      alert('Captcha verification failed');
      return;
    }

    // Perform your login logic here, e.g., send data to backend for authentication
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Captcha Value:', captchaValue);
  };

  const moveBoxToRandomLocation = () => {
    const newX = Math.floor(Math.random() * window.innerWidth);
    const newY = Math.floor(Math.random() * window.innerHeight);
    setBoxPosition({ x: newX, y: newY });
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Enter Captcha:</label>
          <input type="text" value={captchaValue} onChange={(e) => setCaptchaValue(e.target.value)} />
          <button type="button" onClick={generateCaptcha}>Generate Captcha</button>
          <span className="captcha" onClick={moveBoxToRandomLocation} style={{ left: `${boxPosition.x}px`, top: `${boxPosition.y}px`, position: 'absolute', cursor: 'pointer', fontSize: '2em', background: 'none', border: 'none' }}>📦</span>
          <span className="captcha">{generatedCaptcha}</span>
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
