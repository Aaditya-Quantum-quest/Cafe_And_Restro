import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: string;
    menu_item_id: string;
    name: string;
    price: number;
    image_url?: string;
    quantity: number;
    size?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<CartItem, 'id'>) => {
        setItems(prev => {
            const existing = prev.find(i => i.menu_item_id === item.menu_item_id && i.size === item.size);
            if (existing) {
                return prev.map(i => i.menu_item_id === item.menu_item_id && i.size === item.size
                    ? { ...i, quantity: i.quantity + item.quantity } : i);
            }
            return [...prev, { ...item, id: `${item.menu_item_id}-${item.size || 'default'}-${Date.now()}` }];
        });
    };

    const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

    const updateQty = (id: string, qty: number) => {
        if (qty <= 0) { removeItem(id); return; }
        setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
}
