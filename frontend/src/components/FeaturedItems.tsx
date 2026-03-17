import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/featuredItems.css';

interface FeaturedItem {
    id: string;
    name: string;
    description: string;
    image_url: string;
    price?: number;
    tag?: string;
    to?: string;
}

interface FeaturedItemsSectionProps {
    title?: string;
    eyebrow?: string;
    items: FeaturedItem[];
}

export default function FeaturedItemsSection({
    title = "Popular Choices",
    eyebrow = "Chef's Selection",
    items = [],
}: FeaturedItemsSectionProps) {
    return (
        <section className="fi-section">
            {/* Ambient glow */}
            <div className="fi-glow" />

            <div className="fi-container">
                {/* Header */}
                <motion.div
                    className="fi-header"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                >
                    <p className="fi-eyebrow">{eyebrow}</p>
                    <h2 className="fi-title">
                        {title.split(' ').slice(0, -1).join(' ')}{' '}
                        <em>{title.split(' ').slice(-1)}</em>
                    </h2>
                    <div className="fi-divider">
                        <div className="fi-divider-line" />
                        <div className="fi-divider-diamond" />
                        <div className="fi-divider-line" />
                    </div>
                </motion.div>

                {/* Items row */}
                <div className="fi-grid">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            className="fi-item"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.1 }}
                        >
                            <Link to={item.to || `/menu`} className="fi-image-wrap">
                                {/* Outer ring */}
                                <div className="fi-ring fi-ring--outer" />
                                {/* Inner ring */}
                                <div className="fi-ring fi-ring--inner" />
                                {/* Image circle */}
                                <div className="fi-image-circle">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="fi-image" />
                                    ) : (
                                        <div className="fi-image-placeholder">🍽</div>
                                    )}
                                </div>
                                {/* Tag pill */}
                                {item.tag && (
                                    <div className="fi-tag">{item.tag}</div>
                                )}
                                {/* Hover overlay */}
                                <div className="fi-overlay">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10h12M10.5 5l5 5-5 5" stroke="#110b04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </Link>

                            <div className="fi-info">
                                <h3 className="fi-name">{item.name}</h3>
                                <p className="fi-desc">{item.description}</p>
                                {item.price !== undefined && (
                                    <span className="fi-price">₹{item.price}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}