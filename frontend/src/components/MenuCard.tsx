import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Plus, Flame, Leaf } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';
import '../styles/menucard.css';

interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    rating?: number;
    cook_time_min?: number;
    spicy_level?: number;
    veg_nonveg?: string;
    category_name?: string;
}

interface MenuCardProps {
    item: MenuItem;
    className?: string;
}

export default function MenuCard({ item, className }: MenuCardProps) {
    const { addItem } = useCart();

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            menu_item_id: item.id,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            quantity: 1,
        });
        toast.success(`${item.name} added to cart!`, {
            style: { background: '#0f0f0f', color: '#fff', border: '1px solid #1f1f1f' },
            iconTheme: { primary: '#f97316', secondary: '#000' },
        });
    };

    return (
        <Link to={`/menu/${item.id}`}>
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={cn(
                    'menucard',
                    className
                )}
            >
                {/* Image */}
                <div className="menucard-image">
                    {item.image_url ? (
                        <img
                            src={item.image_url}
                            alt={item.name}
                        />
                    ) : (
                        <div className="menucard-image-placeholder">🍽️</div>
                    )}
                    {/* Badges */}
                    <div className="menucard-badges">
                        {item.veg_nonveg === 'veg' && (
                            <span className="menucard-badge menucard-badge-veg">
                                <Leaf /> Veg
                            </span>
                        )}
                        {(item.spicy_level ?? 0) > 0 && (
                            <span className="menucard-badge menucard-badge-spicy">
                                <Flame />{'🌶'.repeat(item.spicy_level ?? 1)}
                            </span>
                        )}
                    </div>
                    {/* Quick add button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={handleAdd}
                        className="menucard-add-btn"
                    >
                        <Plus />
                    </motion.button>
                </div>

                {/* Content */}
                <div className="menucard-content">
                    {item.category_name && (
                        <span className="menucard-category">{item.category_name}</span>
                    )}
                    <h3 className="menucard-name">{item.name}</h3>
                    {item.description && (
                        <p className="menucard-desc">{item.description}</p>
                    )}

                    <div className="menucard-footer">
                        <span className="menucard-price">{formatPrice(item.price)}</span>
                        <div className="menucard-meta">
                            {item.rating != null && item.rating > 0 && (
                                <span className="menucard-meta-item menucard-rating">
                                    <Star />
                                    {item.rating.toFixed(1)}
                                </span>
                            )}
                            {item.cook_time_min && (
                                <span className="menucard-meta-item">
                                    <Clock /> {item.cook_time_min}m
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
