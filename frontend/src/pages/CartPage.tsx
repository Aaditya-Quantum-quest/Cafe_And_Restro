import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../lib/utils';
import api from '../lib/api';
import toast from 'react-hot-toast';
import '../styles/cart.css';

export default function CartPage() {
    const { items, updateQty, removeItem, clearCart, total, count } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [address, setAddress] = useState('');
    const [placing, setPlacing] = useState(false);

    const applyCoupon = () => {
        if (coupon.toUpperCase() === 'FIRSTBITE') {
            setDiscount(100);
            toast.success('Coupon applied! ₹100 off', { style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(232,160,69,0.3)' } });
        } else if (coupon.toUpperCase() === 'WEEKEND20') {
            setDiscount(Math.round(total * 0.2));
            toast.success('20% discount applied!', { style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(232,160,69,0.3)' } });
        } else {
            toast.error('Invalid coupon code', { style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(248,113,113,0.3)' } });
        }
    };

    const placeOrder = async () => {
        if (!user) { navigate('/login'); return; }
        if (!address.trim()) { toast.error('Please enter delivery address'); return; }
        setPlacing(true);
        try {
            await api.post('/orders', {
                items: items.map(i => ({ menu_item_id: i.menu_item_id, name: i.name, quantity: i.quantity, unit_price: i.price, size: i.size })),
                delivery_address: address,
                coupon_code: coupon || undefined,
                discount_amount: discount,
            });
            clearCart();
            toast.success('Order placed successfully!', { style: { background: '#1a1008', color: '#f5ede0', border: '1px solid rgba(232,160,69,0.3)' } });
            navigate('/orders');
        } catch {
            toast.error('Failed to place order');
        } finally { setPlacing(false); }
    };

    if (items.length === 0) {
        return (
            <main className="cart-page">
                <div className="cart-glow cart-glow--center" />
                <div className="cart-glow cart-glow--left" />
                <div className="cart-wrap">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="cart-empty"
                    >
                        <svg className="cart-empty-icon" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="30" stroke="#e8a045" strokeWidth="0.8" opacity="0.3"/>
                            <circle cx="32" cy="32" r="22" stroke="#e8a045" strokeWidth="0.5" opacity="0.2"/>
                            <path d="M20 24h4l3 14h10l3-10H24" stroke="#e8a045" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                            <circle cx="27" cy="42" r="1.5" fill="#e8a045" opacity="0.6"/>
                            <circle cx="36" cy="42" r="1.5" fill="#e8a045" opacity="0.6"/>
                        </svg>
                        <h2 className="cart-empty-title">Your cart is empty</h2>
                        <p className="cart-empty-desc">Add dishes from our menu to begin your order</p>
                        <Link to="/menu" className="cart-empty-btn">
                            Explore Menu
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </main>
        );
    }

    const grandTotal = Math.max(0, total - discount);

    return (
        <main className="cart-page">
            <div className="cart-glow cart-glow--center" />
            <div className="cart-glow cart-glow--left" />

            <div className="cart-wrap">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="cart-page-header"
                >
                    <div className="cart-page-header-left">
                        <p className="cart-page-eyebrow">Your Order</p>
                        <h1 className="cart-page-title">Cart</h1>
                    </div>
                    <div className="cart-page-header-right">
                        <span className="cart-count-badge">{count} item{count !== 1 ? 's' : ''}</span>
                    </div>
                </motion.div>

                <div className="cart-layout">
                    {/* ── Items ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="cart-items-card"
                    >
                        <div className="cart-card-topline" />
                        <AnimatePresence>
                            {items.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, height: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="cart-item"
                                >
                                    <div className="cart-item-image">
                                        {item.image_url
                                            ? <img src={item.image_url} alt={item.name} />
                                            : <span className="cart-item-placeholder">🍽</span>
                                        }
                                    </div>
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        {item.size && <p className="cart-item-size">{item.size}</p>}
                                        <p className="cart-item-unit-price">{formatPrice(item.price)}</p>
                                    </div>
                                    <div className="cart-item-right">
                                        <p className="cart-item-total">{formatPrice(item.price * item.quantity)}</p>
                                        <div className="cart-item-controls">
                                            <div className="cart-qty">
                                                <button onClick={() => updateQty(item.id, item.quantity - 1)} className="cart-qty-btn">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path d="M2 5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                                    </svg>
                                                </button>
                                                <span className="cart-qty-value">{item.quantity}</span>
                                                <button onClick={() => updateQty(item.id, item.quantity + 1)} className="cart-qty-btn">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="cart-remove-btn" aria-label="Remove">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 3h8M5 3V2h2v1M4.5 3v6M7.5 3v6M3 3l.5 7h5l.5-7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* ── Summary ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.14 }}
                        className="cart-summary"
                    >
                        <div className="cart-card-topline" />

                        {/* Delivery address */}
                        <div className="cart-section">
                            <label className="cart-section-label">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 1C4.3 1 3 2.5 3 4.5 3 7.5 6 11 6 11s3-3.5 3-6.5C9 2.5 7.7 1 6 1z" stroke="#e8a045" strokeWidth="0.8"/>
                                    <circle cx="6" cy="4.5" r="1.2" stroke="#e8a045" strokeWidth="0.8"/>
                                </svg>
                                Delivery Address
                            </label>
                            <textarea
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder="Enter your full delivery address..."
                                rows={3}
                                className="cart-textarea"
                            />
                        </div>

                        {/* Coupon */}
                        <div className="cart-section">
                            <label className="cart-section-label">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <rect x="1" y="3.5" width="10" height="5" rx="1" stroke="#e8a045" strokeWidth="0.8"/>
                                    <path d="M4 3.5V3a2 2 0 014 0v.5" stroke="#e8a045" strokeWidth="0.8"/>
                                </svg>
                                Coupon Code
                            </label>
                            <div className="cart-coupon-row">
                                <input
                                    value={coupon}
                                    onChange={e => setCoupon(e.target.value)}
                                    placeholder="e.g. FIRSTBITE"
                                    className="cart-coupon-input"
                                    onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                                />
                                <button onClick={applyCoupon} className="cart-coupon-btn">Apply</button>
                            </div>
                            {discount > 0 && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="cart-coupon-success"
                                >
                                    You saved {formatPrice(discount)}!
                                </motion.p>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="cart-summary-divider">
                            <div className="cart-summary-line" />
                            <div className="cart-summary-diamond" />
                            <div className="cart-summary-line" />
                        </div>

                        {/* Order summary */}
                        <p className="cart-summary-title">Order Summary</p>

                        <div className="cart-summary-rows">
                            <div className="cart-summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="cart-summary-row cart-summary-row--discount">
                                    <span>Discount</span>
                                    <span>−{formatPrice(discount)}</span>
                                </div>
                            )}
                            <div className="cart-summary-row">
                                <span>Delivery</span>
                                <span className="cart-free-badge">FREE</span>
                            </div>
                            <div className="cart-summary-row cart-summary-row--total">
                                <span>Total</span>
                                <span>{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        <button
                            onClick={placeOrder}
                            disabled={placing}
                            className="cart-checkout-btn"
                        >
                            {placing ? (
                                <>
                                    <span className="cart-spinner" />
                                    Placing Order...
                                </>
                            ) : (
                                <>
                                    Place Order
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2 7h10M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </>
                            )}
                        </button>

                        <p className="cart-secure-note">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <path d="M5.5 1L2 2.5V6c0 2 1.5 3.5 3.5 4C7 9.5 9 8 9 6V2.5L5.5 1z" stroke="currentColor" strokeWidth="0.8"/>
                            </svg>
                            Secure checkout · Free cancellation
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}