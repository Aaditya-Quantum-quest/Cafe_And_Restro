import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            {/* Decorative top border */}
            <div className="footer-top-border" />

            {/* Ambient glows */}
            <div className="footer-glow footer-glow--left" />
            <div className="footer-glow footer-glow--right" />

            {/* Decorative plate SVG */}
            <svg className="footer-plate-decor" viewBox="0 0 220 220" fill="none">
                <circle cx="110" cy="110" r="100" stroke="#e8a045" strokeWidth="0.8" />
                <circle cx="110" cy="110" r="80" stroke="#e8a045" strokeWidth="0.4" />
                <circle cx="110" cy="110" r="50" stroke="#e8a045" strokeWidth="0.6" />
                <circle cx="110" cy="110" r="10" fill="#e8a045" fillOpacity="0.3" />
                <line x1="10" y1="110" x2="60" y2="110" stroke="#e8a045" strokeWidth="0.5" />
                <line x1="160" y1="110" x2="210" y2="110" stroke="#e8a045" strokeWidth="0.5" />
                <line x1="110" y1="10" x2="110" y2="60" stroke="#e8a045" strokeWidth="0.5" />
                <line x1="110" y1="160" x2="110" y2="210" stroke="#e8a045" strokeWidth="0.5" />
            </svg>

            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand-row">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <i className="fi fi-sr-hat-chef"></i>
                            </div>
                            <div className="footer-logo-text-wrap">
                                <span className="footer-logo-text">21 Cafe</span>
                                <span className="footer-logo-amp">&</span>
                                <span className="footer-logo-text">Restaurant</span>
                            </div>
                        </Link>
                        <p className="footer-desc">
                            A journey of flavor, artistry, and refined ambiance,<br />
                            crafted for the discerning palate.
                        </p>
                        <div className="footer-socials">
                            <button className="footer-social-btn" aria-label="Instagram">
                                <i className="fi fi-brands-instagram"></i>
                            </button>
                            <button className="footer-social-btn" aria-label="Twitter">
                                <i className="fi fi-brands-twitter"></i>
                            </button>
                            <button className="footer-social-btn" aria-label="Facebook">
                                <i className="fi fi-brands-facebook"></i>
                            </button>
                            <button className="footer-social-btn" aria-label="YouTube">
                                <i className="fi fi-brands-youtube"></i>
                            </button>
                        </div>
                    </div>

                    <div className="footer-divider-vert" />

                    {/* Links grid */}
                    <div className="footer-links-grid">
                        <div className="footer-col">
                            <h4 className="footer-section-title">
                                <span className="footer-title-diamond" />
                                Explore
                            </h4>
                            <ul className="footer-links">
                                {[['Menu', '/menu'], ["Today's Special", '/today'], ['Latest Offers', '/offers'], ['Combo Meals', '/combos']].map(([label, to]) => (
                                    <li key={to}>
                                        <Link to={to} className="footer-link">
                                            <span className="footer-link-arrow">→</span>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-section-title">
                                <span className="footer-title-diamond" />
                                Company
                            </h4>
                            <ul className="footer-links">
                                {['About Us', 'Reservations', 'Careers', 'Contact'].map(item => (
                                    <li key={item}>
                                        <span className="footer-link">
                                            <span className="footer-link-arrow">→</span>
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-section-title">
                                <span className="footer-title-diamond" />
                                Visit Us
                            </h4>
                            <div className="footer-contact-info">
                                <div className="footer-contact-item">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                        <path d="M6.5 1C4.5 1 3 2.8 3 5c0 3 3.5 7 3.5 7S10 8 10 5c0-2.2-1.5-4-3.5-4z" stroke="#e8a045" strokeWidth="0.8"/>
                                        <circle cx="6.5" cy="5" r="1.2" stroke="#e8a045" strokeWidth="0.8"/>
                                    </svg>
                                    123 Culinary Street, Food District
                                </div>
                                <div className="footer-contact-item">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                        <rect x="1.5" y="3" width="10" height="7" rx="1" stroke="#e8a045" strokeWidth="0.8"/>
                                        <path d="M1.5 4.5l5 3 5-3" stroke="#e8a045" strokeWidth="0.8"/>
                                    </svg>
                                    hello@gulson.com
                                </div>
                                <div className="footer-contact-item">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                        <circle cx="6.5" cy="6.5" r="5" stroke="#e8a045" strokeWidth="0.8"/>
                                        <path d="M6.5 3.5v3l2 2" stroke="#e8a045" strokeWidth="0.8" strokeLinecap="round"/>
                                    </svg>
                                    Mon–Sun · 11am – 11pm
                                </div>
                                <div className="footer-contact-item">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                        <path d="M2 3.5c0 5 3.5 7.5 4.5 7.5S11 8.5 11 3.5c-1-.5-2-.8-4.5-.8S3 3 2 3.5z" stroke="#e8a045" strokeWidth="0.8"/>
                                    </svg>
                                    +91 98765 43210
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-divider">
                        <div className="footer-bottom-line" />
                        <div className="footer-bottom-diamond" />
                        <div className="footer-bottom-line" />
                    </div>
                    <div className="footer-bottom-row">
                        <p className="footer-copyright">© 2026 Gulson Restaurant. All rights reserved.</p>
                        <p className="footer-crafted">Crafted with care for culinary excellence</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}