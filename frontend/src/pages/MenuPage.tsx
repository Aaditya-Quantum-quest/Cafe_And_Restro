import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import api from '../lib/api';
import { motion } from 'framer-motion';
import '../styles/menu.css';

// Components
import FeaturedItems from '../components/FeaturedItems';
import MenuShowcase from '@/components/MenuShowcase';

const CATEGORIES = [
    { label: 'All', slug: 'all', emoji: '🍽️' },
    { label: 'Pizza', slug: 'pizza', emoji: '🍕' },
    { label: 'Burgers', slug: 'burgers', emoji: '🍔' },
    { label: 'Pasta', slug: 'pasta', emoji: '🍝' },
    { label: 'Grills', slug: 'grills', emoji: '🥩' },
    { label: 'Seafood', slug: 'seafood', emoji: '🦐' },
    { label: 'Salads', slug: 'salads', emoji: '🥗' },
    { label: 'Desserts', slug: 'desserts', emoji: '🍮' },
    { label: 'Drinks', slug: 'drinks', emoji: '🥤' },
];

const SORTS = [
    { label: 'Popular', value: 'popular' },
    { label: 'Newest', value: 'new' },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc' },
];

export default function MenuPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
    const [sort, setSort] = useState(searchParams.get('sort') || 'popular');
    const [total, setTotal] = useState(0);

    const fetchMenu = async (cat = activeCategory, q = search, s = sort) => {
        setLoading(true);
        try {
            const params: any = { sort: s, limit: 30 };
            if (cat !== 'all') params.category = cat;
            if (q) params.search = q;
            const res = await api.get('/menu', { params });
            setItems(res.data.items);
            setTotal(res.data.total);
        } catch { } finally { setLoading(false); }
    };

    useEffect(() => { fetchMenu(); }, [activeCategory, sort]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchMenu(activeCategory, search, sort);
    };

    const setCategory = (slug: string) => {
        setActiveCategory(slug);
        setSearchParams(prev => { if (slug !== 'all') prev.set('category', slug); else prev.delete('category'); return prev; });
    };

    return (
        <main className="menu-page">
            <div className="menu-container">
                {/* Header */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="menu-header"
                >
              
                    <svg className="menu-header-plate" viewBox="0 0 220 220" fill="none">
                        <circle cx="110" cy="110" r="100" stroke="#e8a045" strokeWidth="0.8" />
                        <circle cx="110" cy="110" r="80" stroke="#e8a045" strokeWidth="0.4" />
                        <circle cx="110" cy="110" r="50" stroke="#e8a045" strokeWidth="0.6" />
                        <circle cx="110" cy="110" r="10" fill="#e8a045" fillOpacity="0.25" />
                        <line x1="10" y1="110" x2="60" y2="110" stroke="#e8a045" strokeWidth="0.5" />
                        <line x1="160" y1="110" x2="210" y2="110" stroke="#e8a045" strokeWidth="0.5" />
                        <line x1="110" y1="10" x2="110" y2="60" stroke="#e8a045" strokeWidth="0.5" />
                        <line x1="110" y1="160" x2="110" y2="210" stroke="#e8a045" strokeWidth="0.5" />
                    </svg>

                    <motion.p
                        className="menu-subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                    >
                        Explore our kitchen
                    </motion.p>

                    <motion.h1
                        className="menu-title"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                    >
                        Our Full <em>Menu</em>
                    </motion.h1>

                    <motion.div
                        className="menu-header-divider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="menu-header-line" />
                        <div className="menu-header-diamond" />
                        <div className="menu-header-line" />
                    </motion.div>

                    <motion.p
                        className="menu-description"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        {total} dishes crafted with passion
                    </motion.p>
                </motion.div> */}

                {/* Featured Items */}
                {/* <FeaturedItems items={items ?? []} /> */}
                <MenuShowcase />

                {/* Search + Sort */}
                {/* <div className="menu-controls">
                    <form onSubmit={handleSearch} className="menu-search-form">
                        <i className="fi fi-rr-search menu-search-icon"></i>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search dishes, ingredients..."
                            className="menu-search-input"
                        />
                        {search && (
                            <button type="button" onClick={() => { setSearch(''); fetchMenu(activeCategory, '', sort); }}
                                className="menu-search-clear">
                                <i className="fi fi-rr-cross menu-search-clear-icon"></i>
                            </button>
                        )}
                    </form>
                    <div className="menu-sort-wrapper">
                        <i className="fi fi-rr-settings-sliders menu-sort-icon"></i>
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="menu-sort-select"
                        >
                            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>
                </div> */}

                {/* Category Tabs */}
                {/* <div className="menu-categories">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.slug}
                            onClick={() => setCategory(cat.slug)}
                            className={`menu-category-tab ${activeCategory === cat.slug ? 'active' : ''}`}
                        >
                            {cat.emoji} {cat.label}
                        </button>
                    ))}
                </div> */}

            </div>
        </main>
    );
}
