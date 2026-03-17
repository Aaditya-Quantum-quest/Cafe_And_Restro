import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import '../styles/carousel.css';

interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    rating?: number;
    cook_time_min?: number;
    category_name?: string;
}

interface InfiniteCarouselProps {
    items: MenuItem[];
}

export default function InfiniteCarousel({ items }: InfiniteCarouselProps) {
    const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', slidesToScroll: 1 },
        [autoplay.current]
    );
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const update = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', update);
        return () => { emblaApi.off('select', update); };
    }, [emblaApi]);

    if (!items.length) return null;

    return (
        <div className="carousel">
            <div className="carousel-viewport" ref={emblaRef}>
                <div className="carousel-container">
                    {items.map((item) => (
                        <div key={item.id} className="carousel-slide">
                            <Link to={`/menu/${item.id}`}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="carousel-card"
                                >
                                    <div className="carousel-card-image">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <div className="carousel-card-image-placeholder">🍽️</div>
                                        )}
                                        <div className="carousel-card-gradient" />
                                        <div className="carousel-card-price">
                                            {formatPrice(item.price)}
                                        </div>
                                    </div>
                                    <div className="carousel-card-content">
                                        {item.category_name && (
                                            <span className="carousel-card-category">{item.category_name}</span>
                                        )}
                                        <h3 className="carousel-card-name">{item.name}</h3>
                                        {item.description && (
                                            <p className="carousel-card-desc">{item.description}</p>
                                        )}
                                        <div className="carousel-card-meta">
                                            {item.rating != null && item.rating > 0 && (
                                                <span className="carousel-card-meta-item carousel-card-rating">
                                                    <Star />
                                                    {item.rating.toFixed(1)}
                                                </span>
                                            )}
                                            {item.cook_time_min && (
                                                <span className="carousel-card-meta-item">
                                                    <Clock />{item.cook_time_min}m
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="carousel-controls">
                <button
                    onClick={scrollPrev}
                    className="carousel-nav-btn"
                >
                    <ChevronLeft />
                </button>
                <div className="carousel-dots">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            className={`carousel-dot ${i === selectedIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
                <button
                    onClick={scrollNext}
                    className="carousel-nav-btn"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
