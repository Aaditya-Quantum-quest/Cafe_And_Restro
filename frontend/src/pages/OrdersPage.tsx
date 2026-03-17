import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, XCircle, Package, Truck, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice, timeAgo } from '../lib/utils';
import api from '../lib/api';
import '../styles/orders.css';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: { label: 'Pending', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: <Clock className="w-4 h-4" /> },
    confirmed: { label: 'Confirmed', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: <CheckCircle className="w-4 h-4" /> },
    preparing: { label: 'Preparing', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', icon: <ChefHat className="w-4 h-4" /> },
    ready: { label: 'Ready', color: 'text-green-400 bg-green-400/10 border-green-400/20', icon: <Package className="w-4 h-4" /> },
    delivered: { label: 'Delivered', color: 'text-green-400 bg-green-400/10 border-green-400/20', icon: <Truck className="w-4 h-4" /> },
    cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: <XCircle className="w-4 h-4" /> },
};

const ORDER_STEPS = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        api.get('/orders/me').then(r => setOrders(r.data.orders)).catch(() => { }).finally(() => setLoading(false));
    }, [user]);

    if (!user) {
        return (
            <main className="min-h-screen pt-24 flex items-center justify-center text-center px-4">
                <div>
                    <ShoppingBag className="w-16 h-16 text-[#1f1f1f] mx-auto mb-4" />
                    <h2 className="text-white font-medium text-2xl mb-2">Please sign in</h2>
                    <p className="text-[#6b7280] mb-6">Sign in to view your order history</p>
                    <Link to="/login" className="px-6 py-3 bg-[#f97316] text-black font-medium rounded-xl hover:bg-[#ea6c0a] transition-colors">Sign In</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-10">
                    <h1 className="text-white font-black text-4xl md:text-5xl">My Orders</h1>
                    <p className="text-[#6b7280] mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
                </div>

                {loading ? (
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-[#0f0f0f] rounded-2xl shimmer" />)}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-24 bg-[#0f0f0f] rounded-2xl border border-[#1f1f1f]">
                        <ShoppingBag className="w-16 h-16 text-[#1f1f1f] mx-auto mb-4" />
                        <h3 className="text-white font-medium text-xl mb-2">No orders yet</h3>
                        <p className="text-[#6b7280] mb-6">Place your first order from our menu</p>
                        <Link to="/menu" className="px-6 py-3 bg-[#f97316] text-black font-medium rounded-xl hover:bg-[#ea6c0a] transition-colors">Explore Menu</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, i) => {
                            const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                            const stepIdx = ORDER_STEPS.indexOf(order.status);

                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="bg-[#0f0f0f] rounded-2xl border border-[#1f1f1f] overflow-hidden"
                                >
                                    {/* Order header */}
                                    <div className="p-5 border-b border-[#1f1f1f] flex items-center justify-between flex-wrap gap-3">
                                        <div>
                                            <p className="text-[#6b7280] text-xs uppercase tracking-widest mb-0.5">Order #{order.id.slice(-8).toUpperCase()}</p>
                                            <p className="text-[#6b7280] text-sm">{timeAgo(order.created_at)}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${sc.color}`}>
                                                {sc.icon} {sc.label}
                                            </span>
                                            <span className="text-[#f97316] font-medium">{formatPrice(order.total_amount)}</span>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    {order.status !== 'cancelled' && (
                                        <div className="px-5 py-4 border-b border-[#1f1f1f]">
                                            <div className="flex items-center gap-1">
                                                {ORDER_STEPS.map((step, si) => (
                                                    <React.Fragment key={step}>
                                                        <div className={`flex-none w-7 h-7 rounded-full flex items-center justify-center border text-xs font-medium transition-all ${si <= stepIdx ? 'bg-[#f97316] border-[#f97316] text-black' : 'border-[#1f1f1f] text-[#3a3a3a]'
                                                            }`}>
                                                            {si < stepIdx ? '✓' : si + 1}
                                                        </div>
                                                        {si < ORDER_STEPS.length - 1 && (
                                                            <div className={`flex-1 h-0.5 transition-all ${si < stepIdx ? 'bg-[#f97316]' : 'bg-[#1f1f1f]'}`} />
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="flex justify-between mt-1.5 text-[10px] text-[#6b7280]">
                                                {ORDER_STEPS.map(s => <span key={s} className="capitalize">{s}</span>)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Items */}
                                    <div className="p-5">
                                        {(Array.isArray(order.items) ? order.items.filter(Boolean) : []).map((item: any) => (
                                            <div key={item.id} className="flex items-center justify-between py-2">
                                                <span className="text-white text-sm">{item.quantity}x {item.name}</span>
                                                <span className="text-[#6b7280] text-sm">{formatPrice(item.unit_price * item.quantity)}</span>
                                            </div>
                                        ))}
                                        {order.delivery_address && (
                                            <p className="text-[#6b7280] text-xs mt-3 pt-3 border-t border-[#1f1f1f]">📍 {order.delivery_address}</p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
