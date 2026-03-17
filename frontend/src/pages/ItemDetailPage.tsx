import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Minus, Plus, ShoppingBag, Flame, Leaf } from 'lucide-react';
import api from '../lib/api';
import { formatPrice } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';
import '../styles/itemdetail.css';

const SIZES = ['S', 'M', 'L'];

export default function ItemDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const { addItem } = useCart();

    useEffect(() => {
        if (!id) return;
        api.get(`/menu/${id}`)
            .then(r => setItem(r.data.item))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = () => {
        if (!item) return;
        addItem({ menu_item_id: item.id, name: item.name, price: item.price, image_url: item.image_url, quantity: qty, size: selectedSize });
        toast.success(`${qty}x ${item.name} added to cart!`, {
            style: { background: '#0f0f0f', color: '#fff', border: '1px solid #1f1f1f' },
            iconTheme: { primary: '#f97316', secondary: '#000' },
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center text-center">
                <div><div className="text-6xl mb-4">🍽️</div><h2 className="text-white text-xl font-medium">Item not found</h2></div>
            </div>
        );
    }

    return (
        <main className="pt-24 pb-20 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="sticky top-28"
                    >
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-[#f97316]/10 blur-3xl scale-75" />
                            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#0f0f0f] border border-[#1f1f1f]">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-8xl">🍽️</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            {/* Cook time badge */}
                            {item.cook_time_min && (
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-[#1f1f1f] text-white text-sm">
                                    <Clock className="w-4 h-4 text-[#f97316]" /> {item.cook_time_min}m
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                        {/* Category + badges */}
                        <div className="flex items-center gap-2 mb-4">
                            {item.category_name && (
                                <span className="px-3 py-1 bg-[#f97316]/10 text-[#f97316] text-xs font-medium rounded-full border border-[#f97316]/20 uppercase tracking-wider">
                                    {item.category_name}
                                </span>
                            )}
                            {item.veg_nonveg === 'veg' && (
                                <span className="flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-800/50">
                                    <Leaf className="w-3 h-3" /> Veg
                                </span>
                            )}
                            {(item.spicy_level ?? 0) > 1 && (
                                <span className="flex items-center gap-1 px-3 py-1 bg-red-900/30 text-red-400 text-xs rounded-full border border-red-800/50">
                                    <Flame className="w-3 h-3" /> Spicy
                                </span>
                            )}
                        </div>

                        <h1 className="text-white font-black text-4xl md:text-5xl leading-tight mb-3">{item.name}</h1>
                        {item.description && (
                            <p className="text-[#6b7280] text-base leading-relaxed mb-6">{item.description}</p>
                        )}

                        {/* Rating */}
                        {item.rating > 0 && (
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.round(item.rating) ? 'fill-[#f97316] text-[#f97316]' : 'text-[#2a2a2a]'}`} />
                                    ))}
                                </div>
                                <span className="text-white font-semibold text-sm">{item.rating.toFixed(1)}</span>
                                {item.rating_count > 0 && <span className="text-[#6b7280] text-sm">({item.rating_count} reviews)</span>}
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-8">
                            <span className="text-[#f97316] font-black text-4xl">{formatPrice(item.price)}</span>
                            <span className="text-[#6b7280] text-sm">per serving</span>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-6">
                            <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Choose Size</p>
                            <div className="flex items-center gap-3">
                                {SIZES.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`w-12 h-12 rounded-xl border text-sm font-medium transition-all ${selectedSize === s
                                                ? 'bg-[#f97316] border-[#f97316] text-black'
                                                : 'bg-[#0f0f0f] border-[#1f1f1f] text-[#6b7280] hover:border-[#f97316]/50 hover:text-white'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-8">
                            <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Quantity</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQty(q => Math.max(1, q - 1))}
                                    className="w-12 h-12 rounded-xl border border-[#1f1f1f] flex items-center justify-center hover:border-[#f97316] transition-colors"
                                >
                                    <Minus className="w-4 h-4 text-white" />
                                </button>
                                <span className="text-white font-medium text-2xl w-10 text-center">{qty}</span>
                                <button
                                    onClick={() => setQty(q => q + 1)}
                                    className="w-12 h-12 rounded-xl bg-[#f97316] flex items-center justify-center hover:bg-[#ea6c0a] transition-colors"
                                >
                                    <Plus className="w-4 h-4 text-black" />
                                </button>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#f97316] text-black font-medium rounded-xl hover:bg-[#ea6c0a] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20 text-base"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Add to Bag — {formatPrice(item.price * qty)}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
