import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../lib/utils';
import '../styles/cartdrawer.css';

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, updateQty, removeItem, total, count } = useCart();

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="cart-drawer-backdrop"
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="cart-drawer"
                    >
                        {/* Header */}
                        <div className="cart-drawer-header">
                            <div className="cart-drawer-title-group">
                                <ShoppingBag />
                                <h2 className="cart-drawer-title">Your Cart</h2>
                                {count > 0 && (
                                    <span className="cart-drawer-count">
                                        {count}
                                    </span>
                                )}
                            </div>
                            <button onClick={onClose} className="cart-drawer-close-btn">
                                <X />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="cart-drawer-items">
                            {items.length === 0 ? (
                                <div className="cart-drawer-empty">
                                    <ShoppingBag />
                                    <p className="cart-drawer-empty-title">Cart is empty</p>
                                    <p className="cart-drawer-empty-desc">Add delicious items from our menu</p>
                                    <Link
                                        to="/menu"
                                        onClick={onClose}
                                        className="cart-drawer-empty-btn"
                                    >
                                        Explore Menu
                                    </Link>
                                </div>
                            ) : (
                                items.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="cart-item"
                                    >
                                        <div className="cart-item-image">
                                            {item.image_url
                                                ? <img src={item.image_url} alt={item.name} />
                                                : <div className="cart-item-image-placeholder">🍽️</div>
                                            }
                                        </div>
                                        <div className="cart-item-details">
                                            <p className="cart-item-name">{item.name}</p>
                                            {item.size && <p className="cart-item-size">Size: {item.size}</p>}
                                            <p className="cart-item-price">{formatPrice(item.price)}</p>
                                        </div>
                                        <div className="cart-item-controls">
                                            <button
                                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                                className="cart-item-qty-btn decrease"
                                            >
                                                <Minus />
                                            </button>
                                            <span className="cart-item-qty">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                                className="cart-item-qty-btn increase"
                                            >
                                                <Plus />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="cart-item-remove"
                                            >
                                                <Trash2 />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="cart-drawer-footer">
                                <div className="cart-drawer-subtotal">
                                    <span className="cart-drawer-subtotal-label">Subtotal</span>
                                    <span className="cart-drawer-subtotal-value">{formatPrice(total)}</span>
                                </div>
                                <Link
                                    to="/cart"
                                    onClick={onClose}
                                    className="cart-drawer-checkout-btn"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
