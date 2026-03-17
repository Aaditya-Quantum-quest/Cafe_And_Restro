import React, { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';
import { formatPrice } from '../../lib/utils';
import toast from 'react-hot-toast';

export default function AdminMenu() {
    const [items, setItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ name: '', description: '', price: '', category_id: '', cook_time_min: '30', spicy_level: '0', veg_nonveg: 'nonveg', is_featured: false });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetch = async () => {
        setLoading(true);
        try {
            const [menuRes, catRes] = await Promise.all([api.get('/menu', { params: { limit: 100 } }), api.get('/categories')]);
            setItems(menuRes.data.items);
            setCategories(catRes.data.categories);
        } catch { }
        setLoading(false);
    };

    useEffect(() => { fetch(); }, []);

    const openAdd = () => {
        setEditing(null);
        setForm({ name: '', description: '', price: '', category_id: '', cook_time_min: '30', spicy_level: '0', veg_nonveg: 'nonveg', is_featured: false });
        setImageFile(null);
        setModalOpen(true);
    };

    const openEdit = (item: any) => {
        setEditing(item);
        setForm({ name: item.name, description: item.description || '', price: String(item.price), category_id: item.category_id || '', cook_time_min: String(item.cook_time_min || 30), spicy_level: String(item.spicy_level || 0), veg_nonveg: item.veg_nonveg || 'nonveg', is_featured: item.is_featured });
        setImageFile(null);
        setModalOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
            if (imageFile) fd.append('image', imageFile);

            if (editing) await api.put(`/menu/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            else await api.post('/menu', fd, { headers: { 'Content-Type': 'multipart/form-data' } });

            toast.success(editing ? 'Item updated!' : 'Item added!', { style: { background: '#0f0f0f', color: '#fff' } });
            setModalOpen(false);
            fetch();
        } catch (e: any) {
            toast.error(e.response?.data?.error || 'Save failed');
        }
        setSaving(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete "${name}"?`)) return;
        try { await api.delete(`/menu/${id}`); toast.success('Deleted!', { style: { background: '#0f0f0f', color: '#fff' } }); fetch(); }
        catch { toast.error('Delete failed'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-white font-black text-2xl">Menu Manager</h2>
                    <p className="text-[#6b7280] text-sm mt-1">{items.length} items</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#f97316] text-black font-medium rounded-xl hover:bg-[#ea6c0a] transition-colors">
                    <Plus className="w-4 h-4" /> Add Item
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-[#0f0f0f] rounded-xl shimmer" />)}
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-[#1f1f1f]">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#1f1f1f] bg-[#0f0f0f]">
                                {['Item', 'Category', 'Price', 'Rating', 'Featured', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-4 text-[#6b7280] font-medium text-xs uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="border-b border-[#1f1f1f] hover:bg-[#0f0f0f] transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#161616] overflow-hidden shrink-0">
                                                {item.image_url ? <img src={item.image_url} alt="" className="w-full h-full object-cover" /> : <span className="w-full h-full flex items-center justify-center text-lg">🍽️</span>}
                                            </div>
                                            <div><p className="text-white font-medium">{item.name}</p><p className="text-[#6b7280] text-xs line-clamp-1">{item.description}</p></div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#6b7280]">{item.category_name || '—'}</td>
                                    <td className="px-5 py-4 text-[#f97316] font-medium">{formatPrice(item.price)}</td>
                                    <td className="px-5 py-4 text-[#6b7280]">{item.rating > 0 ? `⭐ ${item.rating}` : '—'}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_featured ? 'bg-[#f97316]/10 text-[#f97316]' : 'bg-[#1f1f1f] text-[#6b7280]'}`}>
                                            {item.is_featured ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(item)} className="p-2 rounded-lg border border-[#1f1f1f] text-[#6b7280] hover:text-white hover:border-[#f97316]/50 transition-colors"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(item.id, item.name)} className="p-2 rounded-lg border border-[#1f1f1f] text-[#6b7280] hover:text-red-400 hover:border-red-900/50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/70 z-50" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-x-4 top-8 bottom-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl z-50 overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-white font-medium text-xl">{editing ? 'Edit Item' : 'Add New Item'}</h3>
                                    <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-[#161616] transition-colors"><X className="w-5 h-5 text-[#6b7280]" /></button>
                                </div>

                                <div className="space-y-4">
                                    {/* Image upload */}
                                    <div>
                                        <label className="text-[#6b7280] text-sm mb-2 block">Image</label>
                                        <div onClick={() => fileRef.current?.click()} className="h-36 border border-dashed border-[#1f1f1f] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#f97316]/50 transition-colors">
                                            {imageFile ? <p className="text-white text-sm">{imageFile.name}</p> : <><Upload className="w-8 h-8 text-[#3a3a3a]" /><p className="text-[#6b7280] text-sm">Click to upload image</p></>}
                                        </div>
                                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                                    </div>

                                    {[['name', 'Name', 'text', 'Pan-Seared Scallops'], ['description', 'Description', 'text', 'Rich and creamy...'], ['price', 'Price (₹)', 'number', '299']].map(([key, label, type, placeholder]) => (
                                        <div key={key}>
                                            <label className="text-[#6b7280] text-sm mb-2 block">{label}</label>
                                            <input type={type} value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                                                placeholder={placeholder}
                                                className="w-full bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white placeholder-[#3a3a3a] focus:outline-none focus:border-[#f97316] text-sm" />
                                        </div>
                                    ))}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[#6b7280] text-sm mb-2 block">Category</label>
                                            <select value={form.category_id} onChange={e => setForm(p => ({ ...p, category_id: e.target.value }))}
                                                className="w-full bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f97316] appearance-none">
                                                <option value="">Select...</option>
                                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[#6b7280] text-sm mb-2 block">Veg / Non-Veg</label>
                                            <select value={form.veg_nonveg} onChange={e => setForm(p => ({ ...p, veg_nonveg: e.target.value }))}
                                                className="w-full bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f97316] appearance-none">
                                                <option value="veg">Veg</option>
                                                <option value="nonveg">Non-Veg</option>
                                                <option value="vegan">Vegan</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[#6b7280] text-sm mb-2 block">Cook Time (min)</label>
                                            <input type="number" value={form.cook_time_min} onChange={e => setForm(p => ({ ...p, cook_time_min: e.target.value }))}
                                                className="w-full bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f97316]" />
                                        </div>
                                        <div>
                                            <label className="text-[#6b7280] text-sm mb-2 block">Spicy Level (0-3)</label>
                                            <input type="number" min={0} max={3} value={form.spicy_level} onChange={e => setForm(p => ({ ...p, spicy_level: e.target.value }))}
                                                className="w-full bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f97316]" />
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div onClick={() => setForm(p => ({ ...p, is_featured: !p.is_featured }))}
                                            className={`w-11 h-6 rounded-full border transition-all ${form.is_featured ? 'bg-[#f97316] border-[#f97316]' : 'bg-[#161616] border-[#1f1f1f]'} relative`}>
                                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${form.is_featured ? 'left-5' : 'left-0.5'}`} />
                                        </div>
                                        <span className="text-[#6b7280] text-sm">Featured item</span>
                                    </label>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => setModalOpen(false)} className="flex-1 py-3 border border-[#1f1f1f] text-[#6b7280] rounded-xl hover:border-[#2a2a2a] text-sm font-medium transition-colors">Cancel</button>
                                    <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-[#f97316] text-black font-medium rounded-xl hover:bg-[#ea6c0a] disabled:opacity-50 text-sm transition-colors">
                                        {saving ? 'Saving...' : editing ? 'Update' : 'Add Item'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
