import React from 'react';
import HeroSection from '../components/HeroSection';
import BannerSection from '@/components/Banner';
import FeaturedDishes from '@/components/FeaturedDishes';
import FeaturedSection from '@/components/FeaturedSection';




export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <BannerSection />
            <FeaturedDishes />
            <FeaturedSection />
        </main>
    );
}
