import React, { useState, useEffect } from 'react';
import './App.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    generateCaptcha();
    moveBoxToBottomRight();
  }, []);

  useEffect(() => {
    evaluatePasswordStrength(password);
  }, [password]);

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

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Captcha Value:', captchaValue);
  };

  const moveBoxToRandomLocation = () => {
    const newX = Math.floor(Math.random() * (window.innerWidth - 200));
    const newY = Math.floor(Math.random() * (window.innerHeight - 200));
    setBoxPosition({ x: newX, y: newY });
  };

  const moveBoxToBottomRight = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    setBoxPosition({ x: maxX, y: maxY });
  };

  const evaluatePasswordStrength = (password) => {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;

    strength += Math.min(10, length);
    strength += hasUpperCase ? 20 : 0;
    strength += hasLowerCase ? 20 : 0;
    strength += hasNumber ? 20 : 0;
    strength += hasSpecialChar ? 20 : 0;

    setPasswordStrength(Math.min(100, strength));
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
          <div className="password-strength-bar">
            <progress value={passwordStrength} max="100"></progress>
            <span style={{ marginLeft: '0.5em' }}>Password Strength: {passwordStrength}%</span>
          </div>
        </div>
        <div className="form-group">
          <label>Enter Captcha (Case Sensitive):</label>
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
