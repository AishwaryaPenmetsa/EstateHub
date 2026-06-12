import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Building2, ShieldCheck } from 'lucide-react';

const LoginSignup = ({ setActiveTab }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success'|'error', text: '' }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin && !formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatusMessage({
      type: 'success',
      text: isLogin 
        ? 'Sign in successful! Redirecting you to the home portal...' 
        : 'Account created successfully! Auto-logging you in...'
    });

    // Reset fields after successful mock auth
    setTimeout(() => {
      setStatusMessage(null);
      setActiveTab('home');
    }, 2000);
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setStatusMessage(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      agreeTerms: false
    });
  };

  return (
    <div className="auth-page-container">
      {/* Decorative blurred background shapes */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197, 168, 128, 0.08) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30, 58, 138, 0.1) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 1
      }}></div>

      <div className="auth-card-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        {/* Back Link */}
        <button 
          onClick={() => setActiveTab('home')} 
          style={{
            position: 'absolute',
            top: '25px',
            left: '25px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--secondary-color)'}
          onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Logo and Titles */}
        <div className="auth-header-block">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary-color)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
            <Building2 size={28} />
            <span>Estate<span style={{ color: '#ffffff' }}>Hub</span></span>
          </div>
          <h2 className="auth-title">
            {isLogin ? 'Welcome ' : 'Join '}
            <span>{isLogin ? 'Back' : 'EstateHub'}</span>
          </h2>
          <p className="auth-desc">
            {isLogin 
              ? 'Enter your advisor credentials to manage listing sheets.' 
              : 'Create an account to save premium property searches.'}
          </p>
        </div>

        {/* Messages */}
        {statusMessage && (
          <div className={`alert alert-${statusMessage.type}`}>
            <ShieldCheck size={18} />
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field (Sign Up Only) */}
          {!isLogin && (
            <div className="floating-group">
              <input
                type="text"
                name="name"
                className="floating-input floating-input-icon"
                placeholder=" "
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <span className="floating-label floating-label-icon">Full Name</span>
              <User className="input-field-icon" size={18} />
              {errors.name && <div style={{ color: 'var(--danger-color)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.name}</div>}
            </div>
          )}

          {/* Email Field */}
          <div className="floating-group">
            <input
              type="email"
              name="email"
              className="floating-input floating-input-icon"
              placeholder=" "
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <span className="floating-label floating-label-icon">Email Address</span>
            <Mail className="input-field-icon" size={18} />
            {errors.email && <div style={{ color: 'var(--danger-color)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="floating-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="floating-input floating-input-icon"
              placeholder=" "
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span className="floating-label floating-label-icon">Password</span>
            <Lock className="input-field-icon" size={18} />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <div style={{ color: 'var(--danger-color)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.password}</div>}
          </div>

          {/* Agree Terms Checkbox (Sign Up Only) */}
          {!isLogin && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                style={{ marginTop: '0.25rem', cursor: 'pointer' }}
              />
              <label htmlFor="agreeTerms" style={{ fontSize: '0.88rem', color: '#94a3b8', cursor: 'pointer' }}>
                I agree to the <span style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>Privacy Policy</span>.
              </label>
            </div>
          )}
          {!isLogin && errors.agreeTerms && (
            <div style={{ color: 'var(--danger-color)', fontSize: '0.8rem', marginBottom: '1rem' }}>{errors.agreeTerms}</div>
          )}

          {/* Submit button */}
          <button 
            type="submit" 
            className="btn btn-gold" 
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
            disabled={!!statusMessage}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle Option */}
        <p className="auth-toggle-tip">
          {isLogin ? "Don't have an advisor account?" : 'Already have an account?'}
          <button 
            className="auth-toggle-link"
            onClick={handleToggleMode}
          >
            {isLogin ? 'Register here' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
