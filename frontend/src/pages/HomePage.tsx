import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, ArrowRight, Calendar } from 'lucide-react';
import InfiniteCarousel from '../components/InfiniteCarousel';
import MenuCard from '../components/MenuCard';
import api from '../lib/api';
import '../styles/pages.css';

const CATEGORIES = [
    { label: 'All', slug: 'all', emoji: '🍽️' },
    { label: 'Pizza', slug: 'pizza', emoji: '🍕' },
    { label: 'Burgers', slug: 'burgers', emoji: '🍔' },
    { label: 'Pasta', slug: 'pasta', emoji: '🍝' },
    { label: 'Grills', slug: 'grills', emoji: '🥩' },
    { label: 'Seafood', slug: 'seafood', emoji: '🦐' },
    { label: 'Salads', slug: 'salads', emoji: '🥗' },
    { label: 'Desserts', slug: 'desserts', emoji: '🍮' },
    { label: 'Drinks', slug: 'drinks', emoji: '🥤' },
];

export default function HomePage() {
    const [featured, setFeatured] = useState<any[]>([]);
    const [popular, setPopular] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [reservationForm, setReservationForm] = useState({ name: '', email: '', phone: '', party_size: 2, date: '', time: '' });
    const [reserving, setReserving] = useState(false);
    const [reservationDone, setReservationDone] = useState(false);

    useEffect(() => {
        api.get('/menu/featured').then(r => setFeatured(r.data.items)).catch(() => { });
        api.get('/menu/popular').then(r => setPopular(r.data.items)).catch(() => { });
    }, []);

    const handleReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        setReserving(true);
        try {
            await api.post('/reservations', reservationForm);
            setReservationDone(true);
        } catch { } finally { setReserving(false); }
    };

    return (
        <main className="main-content">
            {/* Hero Section */}
            <section className="hero-section">
                {/* Animated background gradient */}
                <div className="hero-bg">
                    <div className="hero-gradient" />
                    <div className="hero-blur-1" />
                    <div className="hero-blur-2" />
                </div>

                <div className="hero-content">
                    {/* Left Text */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="hero-badge">
                                ✨ Premium Dining Experience
                            </span>
                            <h1 className="hero-title">
                                Experience<br />
                                <span className="hero-title-accent">Culinary</span><br />
                                Excellence.
                            </h1>
                            <p className="hero-desc">
                                A journey of flavor, artistry, and refined ambiance, crafted for the discerning palate.
                            </p>
                            <div className="hero-buttons">
                                <Link
                                    to="/menu"
                                    className="hero-primary-btn"
                                >
                                    Explore Menu <ArrowRight />
                                </Link>
                                <a
                                    href="#reservation"
                                    className="hero-secondary-btn"
                                >
                                    <Calendar /> Reserve a Table
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="hero-stats">
                                {[['500+', 'Dishes'], ['50K+', 'Happy Guests'], ['4.9', 'Rating']].map(([val, label]) => (
                                    <div key={label}>
                                        <p className="hero-stat-value">{val}</p>
                                        <p className="hero-stat-label">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right - Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-visual"
                    >
                        <div className="hero-visual-container">
                            {/* Glowing ring */}
                            <div className="hero-ring" />
                            <div className="hero-ring-2" />
                            <div className="hero-ring-3" />
                            <div className="hero-visual-emoji">🍖</div>

                            {/* Floating cards */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className="hero-float-card hero-float-card-1 glass"
                            >
                                <div className="hero-float-row">
                                    <Star />
                                    <span className="hero-float-title">Top Rated</span>
                                </div>
                                <p className="hero-float-desc">By 50,000+ guests</p>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                                className="hero-float-card hero-float-card-2 glass"
                            >
                                <p className="hero-float-label">Fresh Daily</p>
                                <p className="hero-float-desc">Farm to table</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="category-section">
                <div className="category-container">
                    <div className="category-tabs no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat.slug}
                                to={`/menu?category=${cat.slug}`}
                                onClick={() => setActiveCategory(cat.slug)}
                                className={`category-tab ${activeCategory === cat.slug
                                        ? 'category-tab-active'
                                        : 'category-tab-inactive'
                                    }`}
                            >
                                <span>{cat.emoji}</span> {cat.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Carousel */}
            <section className="section">
                <div className="section-header">
                    <div>
                        <p className="section-label">Handpicked for you</p>
                        <h2 className="section-title">Featured Menu</h2>
                    </div>
                    <Link to="/menu" className="section-link">
                        View All <ChevronRight />
                    </Link>
                </div>
                {featured.length > 0 ? (
                    <InfiniteCarousel items={featured} />
                ) : (
                    <div className="h-64 flex items-center justify-center">
                        <div className="spinner" />
                    </div>
                )}
            </section>

            {/* Popular Items */}
            <section className="section-dark">
                <div className="section-container">
                    <div className="section-header">
                        <div>
                            <p className="section-label">Community favorites</p>
                            <h2 className="section-title">Popular Dishes</h2>
                        </div>
                        <Link to="/menu?sort=popular" className="section-link">
                            See All <ChevronRight />
                        </Link>
                    </div>
                    {popular.length > 0 ? (
                        <div className="menu-grid">
                            {popular.map(item => <MenuCard key={item.id} item={item} />)}
                        </div>
                    ) : (
                        <div className="skeleton-grid">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="skeleton shimmer" />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Reservation */}
            <section id="reservation" className="reservation-section">
                <div className="reservation-header">
                    <p className="section-label">Book Your Spot</p>
                    <h2 className="reservation-title">Reserve a Table</h2>
                    <p className="reservation-subtitle">Join us for an unforgettable dining experience</p>
                </div>

                {reservationDone ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="reservation-success"
                    >
                        <div className="reservation-success-icon">🎉</div>
                        <h3 className="reservation-success-title">Reservation Confirmed!</h3>
                        <p className="reservation-success-desc">We'll see you soon. Check your email for details.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleReservation} className="reservation-form">
                        <div className="reservation-form-grid">
                            {[
                                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                                { label: 'Email', key: 'email', type: 'email', placeholder: 'john@example.com' },
                                { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                                { label: 'Party Size', key: 'party_size', type: 'number', placeholder: '2' },
                                { label: 'Date', key: 'date', type: 'date', placeholder: '' },
                                { label: 'Time', key: 'time', type: 'time', placeholder: '' },
                            ].map(({ label, key, type, placeholder }) => (
                                <div key={key} className="form-group">
                                    <label className="form-label">{label}</label>
                                    <input
                                        type={type}
                                        required
                                        placeholder={placeholder}
                                        value={(reservationForm as any)[key]}
                                        onChange={e => setReservationForm(prev => ({ ...prev, [key]: e.target.value }))}
                                        className="form-input"
                                        min={type === 'number' ? 1 : undefined}
                                        max={type === 'number' ? 20 : undefined}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={reserving}
                            className="form-submit"
                        >
                            {reserving ? 'Booking...' : 'Book My Table'}
                        </button>
                    </form>
                )}
            </section>
        </main>
    );
}
