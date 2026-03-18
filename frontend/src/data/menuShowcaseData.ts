export type MenuShowcaseTagVariant = 'hot' | 'new' | 'fresh' | 'special' | 'promo';

export interface MenuShowcaseCard {
    id: string;
    title: [string, string];
    sub: string;
    price: string;
    oldPrice?: string;
    discount?: string;
    tag: { label: string; variant: MenuShowcaseTagVariant };
    images: [string, string, string];
    glowColor: string;
    rating?: number;
}

export const MENU_SHOWCASE_CARDS: MenuShowcaseCard[] = [
    {
        id: 'pizza',
        title: ['Pizza', 'Special'],
        sub: 'Stone-baked · Extra cheese · Best seller',
        price: '₹349',
        oldPrice: '₹449',
        discount: '20%',
        tag: { label: 'Most ordered', variant: 'hot' },
        images: [
            'https://res.cloudinary.com/dmfoosa4j/image/upload/v1773761755/Gemini_Generated_Image_he850ohe850ohe85_fjo3im.png',
            'https://res.cloudinary.com/dmfoosa4j/image/upload/v1773761755/Gemini_Generated_Image_m2e7i6m2e7i6m2e7_t6ldds.png',
            'https://res.cloudinary.com/dmfoosa4j/image/upload/v1773763015/Gemini_Generated_Image_dl5g0gdl5g0gdl5g_vvrrzo.png',
        ],
        glowColor: '#e8410a',
        rating: 4.5,
    },
    {
        id: 'mojito',
        title: ['Mojito', 'Fresh'],
        sub: 'Mint · Lime · Soda · Super refreshing',
        price: '₹149',
        tag: { label: 'Fresh squeeze', variant: 'fresh' },
        images: [
            'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1528823872057-9c018a7b3a84?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1468465236047-6aac20937e1d?w=600&q=80&fit=crop',
        ],
        glowColor: '#3aaa66',
    },
    {
        id: 'burger',
        title: ['Burgers', 'Juicy'],
        sub: 'Double patty · House sauce · Crowd favorite',
        price: '₹299',
        tag: { label: 'New drop', variant: 'new' },
        images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1550317138-10000687a72b?w=600&q=80&fit=crop',
        ],
        glowColor: '#f7a234',
    },
    {
        id: 'sandwich',
        title: ['Sandwiches', 'Crispy'],
        sub: 'Grilled · Loaded fillings · Quick bite',
        price: '₹199',
        tag: { label: "Chef's pick", variant: 'special' },
        images: [
            'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1604908554026-65e63c8799a0?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=600&q=80&fit=crop',
        ],
        glowColor: '#e8b06a',
    },
    {
        id: 'noodles',
        title: ['Noodles', 'Spicy'],
        sub: 'Wok-tossed · Veg/Chicken · Street style',
        price: '₹229',
        oldPrice: '₹279',
        tag: { label: 'Limited time', variant: 'promo' },
        images: [
            'https://images.unsplash.com/photo-1604909053269-3e49f9f78a5e?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1603090987705-6c5c5b4dd14c?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80&fit=crop',
        ],
        glowColor: '#e8410a',
    },
    {
        id: 'momos',
        title: ['Momos', 'Steamed'],
        sub: 'Spicy chutney · Soft wrappers · Best snack',
        price: '₹179',
        tag: { label: "Chef's pick", variant: 'special' },
        images: [
            'https://images.unsplash.com/photo-1660409771867-fd7d0a8f41f8?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1606843046080-45bf7a23c39f?w=600&q=80&fit=crop',
            'https://images.unsplash.com/photo-1606513544710-5b6f71f2e1c8?w=600&q=80&fit=crop',
        ],
        glowColor: '#e8b06a',
    },
];
