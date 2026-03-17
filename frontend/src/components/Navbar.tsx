import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartDrawer from './CartDrawer';
import '../styles/navbar.css';

const NAV_LINKS = [
    { label: 'Menu', to: '/menu' },
    { label: "Today's Special", to: '/today' },
    { label: 'Latest Offers', to: '/offers' },
    { label: 'Combos', to: '/combos' },
    { label: 'About Us', to: '/about' },
];

export default function Navbar() {
    const { count } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [cartOpen, setCartOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile nav on route change
    useEffect(() => {
        setMobileOpen(false);
        setUserMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
        setUserMenuOpen(false);
    };

    return (
        <>
            <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                {/* Top amber line */}
                <div className="navbar-top-line" />

                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <div className="navbar-logo-icon">
                            <i className="fi fi-sr-hat-chef"></i>
                        </div>
                        <div className="navbar-logo-text-wrap">
                            <span className="navbar-logo-name">21 Cafe</span>
                            <span className="navbar-logo-amp">&</span>
                            <span className="navbar-logo-name">Restaurant</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="navbar-nav">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`navbar-nav-link ${location.pathname === link.to ? 'navbar-nav-link--active' : ''}`}
                            >
                                {link.label}
                                {location.pathname === link.to && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="navbar-nav-underline"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="navbar-actions">
                        <button
                            onClick={() => setCartOpen(true)}
                            className="navbar-icon-btn navbar-cart-btn"
                            aria-label="Cart"
                        >
                            <i className="fi fi-rr-shopping-bag"></i>
                            {count > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="navbar-cart-badge"
                                >
                                    {count}
                                </motion.span>
                            )}
                        </button>

                        {user ? (
                            <div className="navbar-user">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="navbar-user-btn"
                                    aria-label="User menu"
                                >
                                    <div className="navbar-user-avatar">
                                        <span>{user.name[0].toUpperCase()}</span>
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                            transition={{ duration: 0.15 }}
                                            className="navbar-user-menu"
                                        >
                                            <div className="navbar-user-info">
                                                <p className="navbar-user-name">{user.name}</p>
                                                <p className="navbar-user-email">{user.email}</p>
                                            </div>
                                            <div className="navbar-user-menu-divider" />
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setUserMenuOpen(false)}
                                                    className="navbar-user-link"
                                                >
                                                    <i className="fi fi-rr-dashboard"></i>
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/orders"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="navbar-user-link"
                                            >
                                                <i className="fi fi-rr-shopping-bag"></i>
                                                My Orders
                                            </Link>
                                            <div className="navbar-user-menu-divider" />
                                            <button
                                                onClick={handleLogout}
                                                className="navbar-logout-btn"
                                            >
                                                <i className="fi fi-rr-log-out"></i>
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="navbar-login-btn">
                                <i className="fi fi-rr-user"></i>
                                <span>Login</span>
                            </Link>
                        )}

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="navbar-mobile-toggle"
                            aria-label="Toggle menu"
                        >
                            <span className={`navbar-hamburger ${mobileOpen ? 'navbar-hamburger--open' : ''}`}>
                                <span /><span /><span />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="navbar-mobile-nav"
                        >
                            <div className="navbar-mobile-inner">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div
                                        key={link.to}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={link.to}
                                            className={`navbar-mobile-link ${location.pathname === link.to ? 'navbar-mobile-link--active' : ''}`}
                                        >
                                            <span className="navbar-mobile-link-dot" />
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                {!user && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: NAV_LINKS.length * 0.05 }}
                                    >
                                        <Link to="/login" className="navbar-mobile-login">
                                            Login / Sign up
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}