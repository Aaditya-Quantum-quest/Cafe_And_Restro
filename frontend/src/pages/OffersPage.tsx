import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Copy, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import '../styles/offers.css';

export default function OffersPage() {
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    useEffect(() => {
        api.get('/offers').then(r => setOffers(r.data.offers)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    // Fallback demo offers when backend unavailable
    const displayOffers = offers.length > 0 ? offers : [
        { id: '1', title: 'Weekend Special', description: 'Get 20% off on all main course items every weekend', discount_pct: 20, coupon_code: 'WEEKEND20', valid_until: '2026-04-01T00:00:00Z', min_order_amount: 500 },
        { id: '2', title: 'Buy 1 Get 1 Free', description: 'Order any pizza and get another one absolutely free!', discount_pct: 50, coupon_code: 'BOGO50', valid_until: '2026-03-31T00:00:00Z', min_order_amount: 300 },
        { id: '3', title: 'First Order Discount', description: 'New customers get flat ₹100 off on their first order', discount_pct: 15, coupon_code: 'FIRSTBITE', valid_until: null, min_order_amount: 200 },
        { id: '4', title: 'Loyalty Bonus', description: 'Spend over ₹1000 and get 25% off your next order', discount_pct: 25, coupon_code: 'LOYAL25', valid_until: '2026-05-01T00:00:00Z', min_order_amount: 1000 },
    ];

    return (
        <main className="offers-page">
            {/* Hero Section */}
            <section className="offers-hero">
                <div className="offers-container">
                    <p className="offers-hero-eyebrow">Limited Time</p>
                    <h1 className="offers-hero-title">
                        Hot Deals & <em>Offers</em>
                    </h1>
                    <div className="offers-hero-divider">
                        <div className="offers-hero-line" />
                        <div className="offers-hero-diamond" />
                        <div className="offers-hero-line" />
                    </div>
                    <p className="offers-hero-subtitle">
                        Exclusive discounts, coupon codes, and special deals — updated daily.
                    </p>
                </div>
            </section>

            <div className="offers-container">
                {/* Weekend Featured Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="offers-special-banner"
                >
                    <div className="offers-special-content">
                        <span className="offers-special-title">Weekend Special</span>
                        <h2 className="offers-special-title">Free Dessert on<br />Orders Above ₹800</h2>
                        <p className="offers-special-desc">Every Saturday & Sunday — no coupon needed. Auto-applied at checkout.</p>
                        <div className="offers-special-code">WEEKEND_DESSERT</div>
                    </div>
                </motion.div>

                {/* Offer Cards */}
                <div className="offers-grid">
                    {displayOffers.map((offer, i) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="offer-card"
                        >
                            <div className="offer-card-header">
                                <div className="offer-discount-badge">{offer.discount_pct}%</div>
                                <div className="offer-icon">🎁</div>
                            </div>
                            <div className="offer-card-content">
                                <h3 className="offer-title">{offer.title}</h3>
                                <p className="offer-description">{offer.description}</p>

                                <div className="offer-details">
                                    <div className="offer-detail-row">
                                        <span className="offer-detail-label">
                                            <Tag className="w-4 h-4" />
                                            Discount
                                        </span>
                                        <span className="offer-detail-value highlight">{offer.discount_pct}% OFF</span>
                                    </div>

                                    {offer.valid_until && (
                                        <div className="offer-detail-row">
                                            <span className="offer-detail-label">
                                                <Clock className="w-4 h-4" />
                                                Expires
                                            </span>
                                            <span className="offer-detail-value">
                                                {new Date(offer.valid_until).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                    )}

                                    {offer.min_order_amount > 0 && (
                                        <div className="offer-detail-row">
                                            <span className="offer-detail-label">
                                                Min. Order
                                            </span>
                                            <span className="offer-detail-value">₹{offer.min_order_amount}</span>
                                        </div>
                                    )}
                                </div>

                                {offer.coupon_code && (
                                    <div className="offer-code-section">
                                        <div className="offer-code-label">Coupon Code</div>
                                        <div className="offer-code-wrapper">
                                            <div className="offer-code">{offer.coupon_code}</div>
                                            <button
                                                onClick={() => copyCode(offer.coupon_code)}
                                                className={`offer-copy-btn ${copiedCode === offer.coupon_code ? 'copied' : ''}`}
                                            >
                                                {copiedCode === offer.coupon_code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="offer-actions">
                                    <Link to="/menu" className="offer-use-btn">
                                        Claim Offer <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
