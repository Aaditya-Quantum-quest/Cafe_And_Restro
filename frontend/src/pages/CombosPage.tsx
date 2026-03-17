import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, Heart, Baby, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../lib/utils';
import api from '../lib/api';
import toast from 'react-hot-toast';
import '../styles/combos.css';

const FALLBACK_COMBOS = [
    { id: 'c1', name: 'Couple Delight', description: 'Perfect for two. Includes 2 main courses, 2 drinks & 1 shared dessert.', original_price: 1200, combo_price: 899, badge: '🔥 Best Seller', items_list: '2x Main Course • 2x Drinks • 1x Dessert', image_url: null },
    { id: 'c2', name: 'Family Feast', description: 'Feeds 4 people. Includes 4 mains, 1 large pizza, 4 drinks & 2 desserts.', original_price: 2800, combo_price: 1999, badge: '👨‍👩‍👧‍👦 Family Pack', items_list: '4x Main Course • 1x Large Pizza • 4x Drinks • 2x Desserts', image_url: null },
    { id: 'c3', name: 'Party Pack', description: 'Feeds 8-10 people. Everything you need for a great party night!', original_price: 5500, combo_price: 3999, badge: '🎉 Party Pack', items_list: '8x Starters • 6x Mains • 2x Pizzas • 10x Drinks • 4x Desserts', image_url: null },
    { id: 'c4', name: "Kids' Happy Meal", description: 'Kid-friendly combo with smaller portions. Includes toy & birthday surprise.', original_price: 450, combo_price: 299, badge: '🎈 Kids Special', items_list: '1x Kids Main • 1x Juice • 1x Dessert • Surprise', image_url: null },
];

const BADGE_ICONS: Record<string, React.ReactNode> = {
    'couple': <Heart className="w-4 h-4" />,
    'family': <Users className="w-4 h-4" />,
    'party': <ShoppingBag className="w-4 h-4" />,
    'kids': <Baby className="w-4 h-4" />,
};

export default function CombosPage() {
    const [combos, setCombos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        api.get('/combos').then(r => setCombos(r.data.combos)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const display = combos.length > 0 ? combos : FALLBACK_COMBOS;

    const handleAdd = (combo: any) => {
        addItem({ menu_item_id: combo.id, name: combo.name, price: combo.combo_price, image_url: combo.image_url, quantity: 1 });
        toast.success(`${combo.name} added to cart!`, {
            style: { background: '#0f0f0f', color: '#fff', border: '1px solid #1f1f1f' },
            iconTheme: { primary: '#f97316', secondary: '#000' },
        });
    };

    return (
        <main className="combos-page">
            {/* Hero Section */}
            <section className="combos-hero">
                <div className="combos-container">
                    <p className="combos-hero-eyebrow">Limited Time</p>
                    <h1 className="combos-hero-title">
                        Best Value <em>Combos</em>
                    </h1>
                    <div className="combos-hero-divider">
                        <div className="combos-hero-line" />
                        <div className="combos-hero-diamond" />
                        <div className="combos-hero-line" />
                    </div>
                    <p className="combos-hero-subtitle">Curated combos for every occasion — couples, families, parties, and kids.</p>
                </div>
            </section>

            <div className="combos-container">
                <div className="combos-grid">
                    {display.map((combo, i) => {
                        const savings = combo.original_price - combo.combo_price;
                        const savingsPct = Math.round((savings / combo.original_price) * 100);

                        return (
                            <motion.div
                                key={combo.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12 }}
                                whileHover={{ y: -4 }}
                                className="combo-card"
                            >
                                {/* Image area */}
                                <div className="combo-card-image">
                                    {combo.image_url ? (
                                        <img src={combo.image_url} alt={combo.name} className="combo-card-img" />
                                    ) : (
                                        <span className="combo-card-placeholder">🍱</span>
                                    )}
                                    {/* Savings badge */}
                                    <div className="combo-card-savings">
                                        SAVE {savingsPct}%
                                    </div>
                                    {combo.badge && (
                                        <div className="combo-card-badge">
                                            {combo.badge}
                                        </div>
                                    )}
                                </div>

                                <div className="combo-card-content">
                                    <h3 className="combo-card-title">{combo.name}</h3>
                                    <p className="combo-card-description">{combo.description}</p>

                                    {/* Items list */}
                                    <div className="combo-card-items">
                                        {(combo.items_list || '').split('•').filter(Boolean).map((item: string) => (
                                            <span key={item} className="combo-item-tag">
                                                {item.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Pricing */}
                                    <div className="combo-card-pricing">
                                        <div className="combo-card-price">
                                            <p className="combo-card-original-price">{formatPrice(combo.original_price)}</p>
                                            <p className="combo-card-current-price">{formatPrice(combo.combo_price)}</p>
                                        </div>
                                        <div className="combo-card-savings-info">
                                            <p className="combo-card-savings-label">You save</p>
                                            <p className="combo-card-savings-amount">{formatPrice(savings)}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAdd(combo)}
                                        className="combo-card-btn"
                                    >
                                        <i className="fi fi-sr-shopping-bag"></i> Order Combo <i className="fi fi-sr-arrow-right"></i>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
