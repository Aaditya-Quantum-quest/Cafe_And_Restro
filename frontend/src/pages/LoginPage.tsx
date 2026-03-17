import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import '../styles/auth.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back!', {
                style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(232,160,69,0.3)' }
            });
            navigate('/');
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Login failed', {
                style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(248,113,113,0.3)' }
            });
        } finally { setLoading(false); }
    };

    return (
        <main className="auth-page">
            {/* Ambient glows */}
            <div className="auth-glow auth-glow--center" />
            <div className="auth-glow auth-glow--left" />

            {/* Decorative plate */}
            <svg className="auth-plate-decor" viewBox="0 0 220 220" fill="none">
                <circle cx="110" cy="110" r="100" stroke="#e8a045" strokeWidth="0.8" />
                <circle cx="110" cy="110" r="80"  stroke="#e8a045" strokeWidth="0.4" />
                <circle cx="110" cy="110" r="50"  stroke="#e8a045" strokeWidth="0.6" />
                <circle cx="110" cy="110" r="10"  fill="#e8a045" fillOpacity="0.25" />
                <line x1="10"  y1="110" x2="60"  y2="110" stroke="#e8a045" strokeWidth="0.5" />
                <line x1="160" y1="110" x2="210" y2="110" stroke="#e8a045" strokeWidth="0.5" />
                <line x1="110" y1="10"  x2="110" y2="60"  stroke="#e8a045" strokeWidth="0.5" />
                <line x1="110" y1="160" x2="110" y2="210" stroke="#e8a045" strokeWidth="0.5" />
            </svg>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="auth-container"
            >
                {/* Top amber line */}
                <div className="auth-card-topline" />

                {/* Header */}
                <div className="auth-header">
                    <Link to="/" className="auth-logo">
                        <div className="auth-logo-icon">
                            <i className="fi fi-sr-hat-chef"></i>
                        </div>
                        <div className="auth-logo-text-wrap">
                            <span className="auth-logo-name">21 Cafe</span>
                            <span className="auth-logo-amp">&</span>
                            <span className="auth-logo-name">Restaurant</span>
                        </div>
                    </Link>

                    <div className="auth-header-divider">
                        <div className="auth-header-line" />
                        <div className="auth-header-diamond" />
                        <div className="auth-header-line" />
                    </div>

                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Email */}
                    <div className="auth-form-group">
                        <label className="auth-form-label">Email Address</label>
                        <div className="auth-input-wrapper">
                            <svg className="auth-input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="0.9"/>
                                <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="0.9"/>
                            </svg>
                            <input
                                type="email" required value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="auth-input"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="auth-form-group">
                        <label className="auth-form-label">Password</label>
                        <div className="auth-input-wrapper">
                            <svg className="auth-input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="2.5" y="6" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="0.9"/>
                                <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
                                <circle cx="7" cy="9.2" r="1" fill="currentColor"/>
                            </svg>
                            <input
                                type={showPass ? 'text' : 'password'} required value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Your password"
                                className="auth-input auth-input--password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="auth-password-toggle"
                                aria-label="Toggle password"
                            >
                                {showPass ? (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="0.9"/>
                                        <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="0.9"/>
                                        <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="0.9"/>
                                        <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="0.9"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="auth-submit-btn">
                        {loading ? (
                            <>
                                <span className="auth-spinner" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </>
                        )}
                    </button>

                    <div className="auth-divider">
                        <div className="auth-divider-line" />
                        <span className="auth-divider-text">or</span>
                        <div className="auth-divider-line" />
                    </div>

                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            New to Gulson?{' '}
                            <Link to="/register" className="auth-footer-link">Create an account</Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}