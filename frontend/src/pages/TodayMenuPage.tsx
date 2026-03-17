import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, Star } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import api from '../lib/api';
import '../styles/todaymenu.css';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Desserts', 'Drinks'];

export default function TodayMenuPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        api.get('/menu/today')
            .then(r => setItems(r.data.items))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const tabs = ['All', ...MEAL_TYPES];
    const filtered = activeTab === 'All' ? items : items.filter(i =>
        i.category_name?.toLowerCase().includes(activeTab.toLowerCase())
    );

    return (
        <main className="today-menu-page">
            {/* Hero Section */}
            <section className="today-menu-hero">
                <div className="today-menu-glow" />
                <div className="today-menu-glow2" />

                <div className="today-menu-steam" style={{ height: "40px", left: "68%", bottom: "40px", animationDelay: "0s" }} />
                <div className="today-menu-steam" style={{ height: "28px", left: "71%", bottom: "44px", animationDelay: "1.1s" }} />
                <div className="today-menu-steam" style={{ height: "34px", left: "65%", bottom: "36px", animationDelay: "2s" }} />

                <svg className="today-menu-plate" viewBox="0 0 220 220" fill="none">
                    <circle cx="110" cy="110" r="100" stroke="#e8a045" strokeWidth="0.8" />
                    <circle cx="110" cy="110" r="85" stroke="#e8a045" strokeWidth="0.4" />
                    <circle cx="110" cy="110" r="55" stroke="#e8a045" strokeWidth="0.8" />
                    <circle cx="110" cy="110" r="12" fill="#e8a045" fillOpacity="0.4" />
                    <line x1="10" y1="110" x2="50" y2="110" stroke="#e8a045" strokeWidth="0.5" />
                    <line x1="170" y1="110" x2="210" y2="110" stroke="#e8a045" strokeWidth="0.5" />
                    <line x1="110" y1="10" x2="110" y2="50" stroke="#e8a045" strokeWidth="0.5" />
                    <line x1="110" y1="170" x2="110" y2="210" stroke="#e8a045" strokeWidth="0.5" />
                </svg>

                <div className="today-menu-container">
                    <p className="today-menu-hero-eyebrow">Limited Time</p>
                    <h1 className="today-menu-hero-title">
                        Today's <em>Special</em>
                    </h1>
                    <div className="today-menu-hero-divider">
                        <div className="today-menu-hero-line" />
                        <div className="today-menu-hero-diamond" />
                        <div className="today-menu-hero-line" />
                    </div>
                    <p className="today-menu-hero-subtitle">
                        Handpicked by our chef team every morning. All dishes prepared fresh with seasonal ingredients.
                    </p>
                </div>

                <motion.div
                    className="today-menu-stamp"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="today-menu-stamp-ring">
                        <div className="today-menu-stamp-inner">
                            <div className="today-menu-stamp-number">{new Date().getDate()}</div>
                            <div className="today-menu-stamp-label">
                                {new Date().toLocaleString("en", { month: "short" })} · {new Date().getFullYear()}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <div className="today-menu-container">
                {/* Tabs */}
                <div className="today-menu-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`today-menu-tab ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Chef's Pick */}
                {activeTab === 'All' && items.length > 0 && (
                    <div className="today-menu-special">
                        <div className="today-menu-special-header">
                            <div className="today-menu-special-icon">
                                <i className="fi fi-sr-star"></i>
                            </div>
                            <h2 className="today-menu-special-title">Chef's Recommendations</h2>
                        </div>
                        <div className="today-menu-special-grid">
                            {items.filter(i => (i.rating ?? 0) >= 4.0).slice(0, 3).map(item => (
                                <MenuCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Most Ordered */}
                {activeTab === 'All' && (
                    <div className="today-menu-section">
                        <h2 className="today-menu-section-title">Most Ordered Today</h2>
                        <div className="today-menu-grid">
                            {items.slice(0, 6).map(item => <MenuCard key={item.id} item={item} />)}
                        </div>
                    </div>
                )}

                {/* Filtered */}
                {activeTab !== 'All' && (
                    <div className="today-menu-section">
                        <h2 className="today-menu-section-title">{activeTab}</h2>
                        {loading ? (
                            <div className="today-menu-grid">
                                {[...Array(6)].map((_, i) => <div key={i} className="today-menu-skeleton" />)}
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="today-menu-empty">
                                <div className="today-menu-empty-icon">🍽️</div>
                                <p className="today-menu-empty-text">No {activeTab} items available today</p>
                            </div>
                        ) : (
                            <div className="today-menu-grid">
                                {filtered.map(item => <MenuCard key={item.id} item={item} />)}
                            </div>
                        )}
                    </div>
                )}

                {/* Availability legend */}
                <div className="today-menu-legend">
                    <p className="today-menu-legend-title">Availability:</p>
                    {[
                        { icon: <i className="fi fi-sr-circle-check available"></i>, label: 'Available Now' },
                        { icon: <i className="fi fi-sr-clock limited"></i>, label: 'Limited Qty' },
                        { icon: <i className="fi fi-sr-circle-cross sold-out"></i>, label: 'Sold Out' },
                    ].map(({ icon, label }) => (
                        <div key={label} className="today-menu-legend-item">
                            {icon} <span className="today-menu-legend-label">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
