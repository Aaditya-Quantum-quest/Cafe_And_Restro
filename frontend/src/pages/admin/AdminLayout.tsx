import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Tag, LogOut, ChefHat, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/admin.css';

const NAV = [
    { label: 'Overview', to: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Menu Manager', to: '/admin/menu', icon: <UtensilsCrossed className="w-5 h-5" /> },
    { label: 'Orders', to: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { label: 'Users', to: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Categories', to: '/admin/categories', icon: <Tag className="w-5 h-5" /> },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        if (user.role !== 'admin') { navigate('/'); }
    }, [user]);

    const handleLogout = async () => { await logout(); navigate('/'); };

    if (!user || user.role !== 'admin') return null;

    const Sidebar = () => (
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[#1f1f1f]">
                <div className="w-8 h-8 bg-[#f97316] rounded-lg flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-black" />
                </div>
                <div>
                    <p className="text-white font-medium text-sm">GULSON</p>
                    <p className="text-[#6b7280] text-xs">Admin Panel</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-[#6b7280]">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {NAV.map(item => {
                    const active = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20' : 'text-[#6b7280] hover:text-white hover:bg-[#161616]'
                                }`}
                        >
                            {item.icon} {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-[#1f1f1f]">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#f97316] flex items-center justify-center text-black font-medium text-sm">
                        {user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-[#6b7280] text-xs truncate">{user.email}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-red-900/20 rounded-xl transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-[#000]">
            <Sidebar />
            {/* Overlay */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />}

            {/* Main */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="h-16 flex items-center px-6 border-b border-[#1f1f1f] bg-[#0a0a0a] sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-[#6b7280]">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-white font-medium">Admin Dashboard</h1>
                    <Link to="/" className="ml-auto text-[#6b7280] hover:text-white text-sm transition-colors">← Back to Site</Link>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
