import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { formatPrice, timeAgo } from '../../lib/utils';
import toast from 'react-hot-toast';

const STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
const STATUS_COLORS: Record<string, string> = {
    pending: 'text-yellow-400 bg-yellow-400/10', confirmed: 'text-blue-400 bg-blue-400/10',
    preparing: 'text-orange-400 bg-orange-400/10', ready: 'text-green-400 bg-green-400/10',
    delivered: 'text-green-400 bg-green-400/10', cancelled: 'text-red-400 bg-red-400/10',
};

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const fetch = async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (filter) params.status = filter;
            const res = await api.get('/orders', { params });
            setOrders(res.data.orders);
        } catch { } finally { setLoading(false); }
    };

    useEffect(() => { fetch(); }, [filter]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            toast.success('Status updated', { style: { background: '#0f0f0f', color: '#fff' } });
            fetch();
        } catch { toast.error('Update failed'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div><h2 className="text-white font-black text-2xl">Orders</h2><p className="text-[#6b7280] text-sm mt-1">{orders.length} orders</p></div>
                <select value={filter} onChange={e => setFilter(e.target.value)}
                    className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#f97316] appearance-none">
                    <option value="">All Statuses</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#1f1f1f]">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#1f1f1f] bg-[#0f0f0f]">
                            {['Order', 'Customer', 'Items', 'Total', 'Time', 'Status', 'Update'].map(h => (
                                <th key={h} className="text-left px-5 py-4 text-[#6b7280] font-medium text-xs uppercase tracking-wider">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i}><td colSpan={7} className="px-5 py-3"><div className="h-8 bg-[#0f0f0f] rounded-lg shimmer" /></td></tr>
                            ))
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-16 text-[#6b7280]">No orders found</td></tr>
                        ) : orders.map(order => (
                            <tr key={order.id} className="border-b border-[#1f1f1f] hover:bg-[#0f0f0f] transition-colors">
                                <td className="px-5 py-4 text-white font-mono text-xs">#{order.id.slice(-8).toUpperCase()}</td>
                                <td className="px-5 py-4">
                                    <p className="text-white text-sm">{order.user_name || 'Guest'}</p>
                                    <p className="text-[#6b7280] text-xs">{order.user_email}</p>
                                </td>
                                <td className="px-5 py-4 text-[#6b7280]">{(order.items || []).filter(Boolean).length} items</td>
                                <td className="px-5 py-4 text-[#f97316] font-medium">{formatPrice(order.total_amount)}</td>
                                <td className="px-5 py-4 text-[#6b7280] text-xs">{timeAgo(order.created_at)}</td>
                                <td className="px-5 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status] || 'text-[#6b7280]'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                                        className="bg-[#161616] border border-[#1f1f1f] rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#f97316] appearance-none">
                                        {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
