import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingBag, Users, UtensilsCrossed } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import api from '../../lib/api';

export default function AdminOverview() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.get('/orders/stats').then(r => setStats(r.data)).catch(() => {
            // Demo stats when backend unavailable
            setStats({
                revenue: 48750.00,
                orders: 342,
                users: 128,
                topItems: [
                    { name: 'Wagyu Burger', qty: 89, revenue: 7120 },
                    { name: 'Truffle Pasta', qty: 67, revenue: 4690 },
                    { name: 'Seafood Platter', qty: 45, revenue: 7200 },
                ],
                daily: [
                    { date: '2026-03-09', revenue: 5200, orders: 42 },
                    { date: '2026-03-10', revenue: 7100, orders: 58 },
                    { date: '2026-03-11', revenue: 4800, orders: 38 },
                    { date: '2026-03-12', revenue: 9200, orders: 71 },
                    { date: '2026-03-13', revenue: 6500, orders: 52 },
                    { date: '2026-03-14', revenue: 8300, orders: 64 },
                    { date: '2026-03-15', revenue: 7650, orders: 17 },
                ],
            });
        });
    }, []);

    const STAT_CARDS = [
        { label: 'Total Revenue', value: stats ? formatPrice(stats.revenue) : '—', icon: <TrendingUp className="w-6 h-6 text-[#f97316]" />, color: 'from-[#f97316]/10 to-transparent' },
        { label: 'Total Orders', value: stats?.orders ?? '—', icon: <ShoppingBag className="w-6 h-6 text-blue-400" />, color: 'from-blue-400/10 to-transparent' },
        { label: 'Registered Users', value: stats?.users ?? '—', icon: <Users className="w-6 h-6 text-green-400" />, color: 'from-green-400/10 to-transparent' },
        { label: 'Top Item Orders', value: stats?.topItems?.[0]?.qty ?? '—', icon: <UtensilsCrossed className="w-6 h-6 text-purple-400" />, color: 'from-purple-400/10 to-transparent' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-white font-black text-2xl mb-1">Overview</h2>
                <p className="text-[#6b7280] text-sm">Restaurant performance at a glance</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {STAT_CARDS.map(card => (
                    <div key={card.label} className={`relative overflow-hidden bg-[#0f0f0f] rounded-2xl border border-[#1f1f1f] p-5`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-50`} />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[#6b7280] text-sm">{card.label}</p>
                                <div className="w-10 h-10 rounded-xl bg-[#161616] flex items-center justify-center">{card.icon}</div>
                            </div>
                            <p className="text-white font-black text-3xl">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-[#0f0f0f] rounded-2xl border border-[#1f1f1f] p-6">
                <h3 className="text-white font-medium mb-6">Revenue — Last 7 Days</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={stats?.daily || []} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                        <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={d => new Date(d).toLocaleDateString('en', { month: 'short', day: 'numeric' })} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                        <Tooltip
                            contentStyle={{ background: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: 12, color: '#fff' }}
                            formatter={(v: any) => [formatPrice(v), 'Revenue']}
                        />
                        <Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Top Items */}
            <div className="bg-[#0f0f0f] rounded-2xl border border-[#1f1f1f] p-6">
                <h3 className="text-white font-medium mb-6">Top Selling Items</h3>
                <div className="space-y-4">
                    {(stats?.topItems || []).map((item: any, i: number) => (
                        <div key={item.name} className="flex items-center gap-4">
                            <span className="w-7 h-7 rounded-lg bg-[#161616] flex items-center justify-center text-[#6b7280] text-sm font-medium">{i + 1}</span>
                            <span className="flex-1 text-white text-sm font-medium">{item.name}</span>
                            <span className="text-[#6b7280] text-sm">{item.qty} orders</span>
                            <span className="text-[#f97316] font-medium text-sm">{formatPrice(item.revenue)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
