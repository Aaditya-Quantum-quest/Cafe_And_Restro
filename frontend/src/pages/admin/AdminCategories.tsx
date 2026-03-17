import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function AdminCategories() {
    const [cats, setCats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', slug: '', description: '' });
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const fetch = async () => {
        setLoading(true);
        try { const r = await api.get('/categories'); setCats(r.data.categories); }
        catch { } finally { setLoading(false); }
    };

    useEffect(() => { fetch(); }, []);

    const save = async () => {
        if (!form.name || !form.slug) { toast.error('Name and slug required'); return; }
        setSaving(true);
        try {
            if (editId) await api.put(`/categories/${editId}`, form);
            else await api.post('/categories', form);
            toast.success(editId ? 'Updated!' : 'Added!', { style: { background: '#0f0f0f', color: '#fff' } });
            setForm({ name: '', slug: '', description: '' }); setEditId(null);
            fetch();
        } catch { toast.error('Save failed'); } finally { setSaving(false); }
    };

    const del = async (id: string) => {
        if (!confirm('Delete category?')) return;
        try { await api.delete(`/categories/${id}`); fetch(); } catch { toast.error('Delete failed'); }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-white font-black text-2xl">Categories</h2>

            {/* Add/Edit form */}
            <div className="bg-[#0f0f0f] rounded-2xl border border-[#1f1f1f] p-6">
                <h3 className="text-white font-medium mb-4">{editId ? 'Edit Category' : 'Add Category'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: p.slug || e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                        placeholder="Name (e.g. Sushi)" className="bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white placeholder-[#3a3a3a] focus:outline-none focus:border-[#f97316] text-sm" />
                    <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                        placeholder="Slug (e.g. sushi)" className="bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white placeholder-[#3a3a3a] focus:outline-none focus:border-[#f97316] text-sm" />
                    <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        placeholder="Description" className="bg-[#161616] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white placeholder-[#3a3a3a] focus:outline-none focus:border-[#f97316] text-sm" />
                </div>
                <div className="flex gap-3 mt-4">
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#f97316] text-black font-medium rounded-xl hover:bg-[#ea6c0a] disabled:opacity-50 transition-colors text-sm">
                        <Plus className="w-4 h-4" /> {saving ? 'Saving...' : editId ? 'Update' : 'Add'}
                    </button>
                    {editId && <button onClick={() => { setEditId(null); setForm({ name: '', slug: '', description: '' }); }} className="px-5 py-2.5 border border-[#1f1f1f] text-[#6b7280] rounded-xl hover:text-white text-sm transition-colors">Cancel</button>}
                </div>
            </div>

            {/* List */}
            <div className="overflow-x-auto rounded-xl border border-[#1f1f1f]">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-[#1f1f1f] bg-[#0f0f0f]">
                        {['Name', 'Slug', 'Description', 'Actions'].map(h => <th key={h} className="text-left px-5 py-4 text-[#6b7280] font-medium text-xs uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {loading ? [...Array(4)].map((_, i) => <tr key={i}><td colSpan={4} className="px-5 py-3"><div className="h-8 bg-[#0f0f0f] rounded-lg shimmer" /></td></tr>)
                            : cats.map(cat => (
                                <tr key={cat.id} className="border-b border-[#1f1f1f] hover:bg-[#0f0f0f] transition-colors">
                                    <td className="px-5 py-4 text-white font-medium">{cat.name}</td>
                                    <td className="px-5 py-4"><span className="px-2 py-1 bg-[#161616] text-[#6b7280] rounded-lg text-xs font-mono">{cat.slug}</span></td>
                                    <td className="px-5 py-4 text-[#6b7280] text-xs">{cat.description || '—'}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => { setEditId(cat.id); setForm({ name: cat.name, slug: cat.slug, description: cat.description || '' }); }} className="p-2 rounded-lg border border-[#1f1f1f] text-[#6b7280] hover:text-white hover:border-[#f97316]/50 transition-colors"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => del(cat.id)} className="p-2 rounded-lg border border-[#1f1f1f] text-[#6b7280] hover:text-red-400 hover:border-red-900/50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
