import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E2C97E;
    --gold-dim: rgba(201,168,76,0.25);
    --bg: #0c0d0f;
    --card-bg: #13141a;
    --card-border: rgba(201,168,76,0.12);
    --white: #F5F0E8;
    --muted: rgba(245,240,232,0.45);
  }

  body { background: var(--bg); }

  .production-section {
    background: var(--bg);
    padding: 0 60px;
    margin: 40px 0;
    position: relative;
    overflow: hidden;
    min-height: auto;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }

  .production-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 55% 35% at 10% 20%, rgba(201,168,76,0.04) 0%, transparent 65%),
      radial-gradient(ellipse 45% 40% at 90% 80%, rgba(201,168,76,0.03) 0%, transparent 60%);
    pointer-events: none;
  }

  /* ── HEADER ── */
  .prod-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    padding: 40px 0 20px;
  }

  .prod-title-block {}

  .prod-overline {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 10px;
  }

  .prod-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 3vw, 42px);
    font-weight: 600;
    color: var(--white);
    letter-spacing: -0.3px;
    text-align: center;
  }

  /* filter tabs */
  .prod-filters {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .filter-btn {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 8px 18px;
    background: transparent;
    border: 1px solid rgba(201,168,76,0.2);
    color: var(--muted);
    cursor: pointer;
    transition: all 0.25s;
  }

  .filter-btn:hover,
  .filter-btn.active {
    background: var(--gold);
    border-color: var(--gold);
    color: #0c0d0f;
    font-weight: 600;
  }

  /* ── GRID ── */
  .prod-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 0 40px;
  }

  /* ── CARD ── */
  .food-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    position: relative;
    cursor: pointer;
    transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    aspect-ratio: 1;
  }

  .food-card:hover {
    border-color: rgba(201,168,76,0.55);
    transform: translateY(-6px);
    box-shadow: 0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.15);
  }

  /* corner ornaments */
  .food-card::before,
  .food-card::after {
    content: '';
    position: absolute;
    width: 16px; height: 16px;
    border-color: var(--gold);
    border-style: solid;
    opacity: 0.4;
    transition: opacity 0.3s, width 0.3s, height 0.3s;
    z-index: 3;
  }

  .food-card::before {
    top: 8px; left: 8px;
    border-width: 1.5px 0 0 1.5px;
  }

  .food-card::after {
    bottom: 8px; right: 8px;
    border-width: 0 1.5px 1.5px 0;
  }

  .food-card:hover::before,
  .food-card:hover::after {
    opacity: 1;
    width: 22px; height: 22px;
  }

  /* image */
  .card-img-wrap {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    aspect-ratio: 1;
  }

  .card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 6s ease;
  }

  .food-card:hover .card-img-wrap img {
    transform: scale(1.08);
  }

  /* overlay gradient */
  .card-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13,14,20,0.72) 0%, transparent 55%);
    pointer-events: none;
  }

  /* badge */
  .card-badge {
    position: absolute;
    top: 12px; right: 12px;
    font-family: 'Montserrat', sans-serif;
    font-size: 8px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    background: var(--gold);
    color: #0c0d0f;
    padding: 4px 10px;
    font-weight: 600;
    z-index: 2;
  }

  /* body */
  .card-body {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 2px;
    line-height: 1.2;
  }

  .card-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px;
    font-weight: 400;
    color: var(--muted);
    margin-bottom: 8px;
  }

  /* footer row */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid rgba(201,168,76,0.1);
  }

  .card-price {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--gold-light);
  }

  .card-price span {
    font-size: 12px;
    font-weight: 400;
    color: var(--muted);
    margin-right: 2px;
  }

  .card-add {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: transparent;
    border: 1.5px solid var(--gold-dim);
    color: var(--gold);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.25s, border-color 0.25s, transform 0.2s;
  }

  .card-add:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: #0c0d0f;
    transform: scale(1.12) rotate(90deg);
  }

  /* view all */
  .view-all-wrap {
    display: flex;
    justify-content: center;
    margin-top: 52px;
  }

  .btn-view-all {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 600;
    background: transparent;
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 14px 44px;
    cursor: pointer;
    transition: background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.3s;
  }

  .btn-view-all:hover {
    background: var(--gold);
    color: #0c0d0f;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(201,168,76,0.2);
  }

  /* stagger entrance */
  .food-card {
    animation: cardIn 0.5s ease both;
  }
  ${[0,1,2,3,4,5,6,7].map(i => `.food-card:nth-child(${i+1}) { animation-delay: ${i*0.07}s; }`).join('\n')}

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* responsive */
  @media (max-width: 1100px) { .prod-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 760px)  {
    .prod-grid { grid-template-columns: repeat(2, 1fr); }
    .production-section { padding: 60px 24px 80px; }
    .prod-header { flex-direction: column; align-items: flex-start; gap: 20px; }
  }
  @media (max-width: 480px)  { .prod-grid { grid-template-columns: 1fr; } }
`;

const FILTERS = ["All", "Pasta", "Sushi", "Bowls", "Tacos", "Grills"];

const FOODS = [
  { name: "Beef Sushi",         sub: "Japanese Style",    price: 18, stars: 5, reviews: 124, badge: "Popular",   img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80&fit=crop" },
  { name: "Salmon Bowl",        sub: "with Teriyaki",     price: 22, stars: 4, reviews: 89,  badge: "",          img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80&fit=crop" },
  { name: "Spaghetti Bolognese",sub: "Meat Frying",       price: 16, stars: 5, reviews: 210, badge: "Best Sell", img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&q=80&fit=crop" },
  { name: "Seafood Platter",    sub: "Chef's Selection",  price: 34, stars: 5, reviews: 76,  badge: "New",       img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80&fit=crop" },
  { name: "Pesto Pasta",        sub: "with Olive Oil",    price: 14, stars: 4, reviews: 155, badge: "",          img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80&fit=crop" },
  { name: "Taco Fiesta",        sub: "Soup Recipe",       price: 12, stars: 4, reviews: 98,  badge: "",          img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80&fit=crop" },
  { name: "Spaghetti",          sub: "with Olive Oil",    price: 15, stars: 5, reviews: 180, badge: "Chef Pick", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80&fit=crop" },
  { name: "Grilled Salmon",     sub: "Lemon & Herbs",     price: 28, stars: 5, reviews: 143, badge: "",          img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80&fit=crop" },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="card-stars">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`star${i > stars ? " empty" : ""}`} />
      ))}
    </div>
  );
}

export default function FeaturedDishes() {
  const [active, setActive] = useState("All");

  return (
    <>
      <style>{styles}</style>
      <section className="production-section">

        <div className="prod-header">
          <div className="prod-title-block">
            <h2 className="prod-title">Featured Dishes</h2>
          </div>
        </div>

        <div className="prod-grid">
          {FOODS.map((food, i) => (
            <div className="food-card" key={i}>
              <div className="card-img-wrap">
                <img src={food.img} alt={food.name} />
                {food.badge && <span className="card-badge">{food.badge}</span>}
              </div>
              <div className="card-body">
                <p className="card-name">{food.name}</p>
                <p className="card-sub">{food.sub}</p>
                <div className="card-footer">
                  <div className="card-price">
                    <span>₹</span>{food.price * 80}
                  </div>
                  <button className="card-add" aria-label="Add to cart">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}