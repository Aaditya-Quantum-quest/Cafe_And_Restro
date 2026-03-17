import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import '../styles/auth.css';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error('Passwords do not match', {
                style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(248,113,113,0.3)' }
            });
            return;
        }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.phone);
            toast.success('Welcome to 21 Cafe & Restaurant!', {
                style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(232,160,69,0.3)' }
            });
            navigate('/');
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Registration failed', {
                style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(248,113,113,0.3)' }
            });
        } finally { setLoading(false); }
    };

    const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(prev => ({ ...prev, [key]: e.target.value }));

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

                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join us for exclusive dining experiences</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    {/* Name + Phone row */}
                    <div className="register-form-grid">
                        {/* Full Name */}
                        <div className="auth-form-group">
                            <label className="auth-form-label">Full Name</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 11c0-2.5 1.5-3.5 5-3.5s5 1 5 3.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
                                    <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="0.9"/>
                                </svg>
                                <input
                                    type="text" required value={form.name}
                                    onChange={set('name')}
                                    placeholder="John Doe"
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="auth-form-group">
                            <label className="auth-form-label">Phone <span style={{ color: '#4a3a2a', fontSize: '10px' }}>(optional)</span></label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <rect x="3" y="1" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="0.9"/>
                                    <circle cx="7" cy="10.5" r="0.8" fill="currentColor"/>
                                </svg>
                                <input
                                    type="tel" value={form.phone}
                                    onChange={set('phone')}
                                    placeholder="+91 98765 43210"
                                    className="auth-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="auth-form-group">
                        <label className="auth-form-label">Email Address</label>
                        <div className="auth-input-wrapper">
                            <svg className="auth-input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="0.9"/>
                                <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="0.9"/>
                            </svg>
                            <input
                                type="email" required value={form.email}
                                onChange={set('email')}
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
                                type={showPass ? 'text' : 'password'} required
                                value={form.password} onChange={set('password')}
                                placeholder="Min. 8 characters"
                                minLength={8}
                                className="auth-input auth-input--password"
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} className="auth-password-toggle" aria-label="Toggle password">
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

                    {/* Confirm Password */}
                    <div className="auth-form-group">
                        <label className="auth-form-label">Confirm Password</label>
                        <div className="auth-input-wrapper">
                            <svg className="auth-input-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="2.5" y="6" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="0.9"/>
                                <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
                                <circle cx="7" cy="9.2" r="1" fill="currentColor"/>
                            </svg>
                            <input
                                type={showConfirm ? 'text' : 'password'} required
                                value={form.confirmPassword} onChange={set('confirmPassword')}
                                placeholder="Re-enter password"
                                minLength={8}
                                className={`auth-input auth-input--password ${
                                    form.confirmPassword && form.password !== form.confirmPassword
                                        ? 'auth-input-error' : ''
                                }`}
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="auth-password-toggle" aria-label="Toggle confirm password">
                                {showConfirm ? (
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
                        {form.confirmPassword && form.password !== form.confirmPassword && (
                            <p className="auth-error-message">Passwords do not match</p>
                        )}
                    </div>

                    <button type="submit" disabled={loading} className="auth-submit-btn">
                        {loading ? (
                            <>
                                <span className="auth-spinner" />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create Account
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
                            Already have an account?{' '}
                            <Link to="/login" className="auth-footer-link">Sign in</Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}