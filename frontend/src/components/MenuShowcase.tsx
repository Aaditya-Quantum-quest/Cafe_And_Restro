type TagVariant = "hot" | "new" | "fresh" | "special" | "promo";

interface MenuItem {
  id: string;
  title: string[];
  sub: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  tag: { label: string; variant: TagVariant };
  image: string;
  glowColor: string;
  rating?: number;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "pizza",
    title: ["Pizza", "Special"],
    sub: "Stone-baked · Extra cheese · Best seller",
    price: "₹349",
    oldPrice: "₹449",
    discount: "20%",
    tag: { label: "Most ordered", variant: "hot" },
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop",
    glowColor: "#e8410a",
    rating: 4.5,
  },
  {
    id: "mojito",
    title: ["Mojito", "Fresh"],
    sub: "Mint · Lime · Soda · Super refreshing",
    price: "₹149",
    tag: { label: "Fresh squeeze", variant: "fresh" },
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80&fit=crop",
    glowColor: "#3aaa66",
  },
  {
    id: "burger",
    title: ["Burgers", "Juicy"],
    sub: "Double patty · House sauce · Crowd favorite",
    price: "₹299",
    tag: { label: "New drop", variant: "new" },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&fit=crop",
    glowColor: "#f7a234",
  },
  {
    id: "sandwich",
    title: ["Sandwiches", "Crispy"],
    sub: "Grilled · Loaded fillings · Quick bite",
    price: "₹199",
    tag: { label: "Chef's pick", variant: "special" },
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&fit=crop",
    glowColor: "#e8b06a",
  },
  {
    id: "noodles",
    title: ["Noodles", "Spicy"],
    sub: "Wok-tossed · Veg/Chicken · Street style",
    price: "₹229",
    oldPrice: "₹279",
    tag: { label: "Limited time", variant: "promo" },
    image: "https://images.unsplash.com/photo-1604909053269-3e49f9f78a5e?w=600&q=80&fit=crop",
    glowColor: "#e8410a",
  },
  {
    id: "momos",
    title: ["Momos", "Steamed"],
    sub: "Spicy chutney · Soft wrappers · Best snack",
    price: "₹179",
    tag: { label: "Chef's pick", variant: "special" },
    image: "https://images.unsplash.com/photo-1660409771867-fd7d0a8f41f8?w=600&q=80&fit=crop",
    glowColor: "#e8b06a",
  },
  {
    id: "desserts",
    title: ["Desserts", "Sweet"],
    sub: "Chocolate · Creamy · Must try",
    price: "₹199",
    tag: { label: "New drop", variant: "new" },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&fit=crop",
    glowColor: "#f7a234",
  },
];

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --bg: #0a0804;
    --accent: #e8410a;
    --accent2: #f7a234;
    --text: #f0e8dc;
    --muted: #5a4a38;
    --border: #1e1608;
  }

  .ms-body {
    background: var(--bg);
    font-family: 'Outfit', sans-serif;
    color: var(--text);
    padding: 48px 24px;
    min-height: 100vh;
  }

  /* ── Header ── */
  .ms-header {
    text-align: center;
    margin-bottom: 48px;
    position: relative;
  }
  .ms-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c87d3a;
    margin-bottom: 12px;
    display: block;
  }
  .ms-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 300;
    color: #f5ede0;
    line-height: 1.1;
    letter-spacing: -0.01em;
    margin-bottom: 0;
  }
  .ms-title-accent {
    font-style: italic;
    font-weight: 600;
    color: #e8a045;
  }
  .ms-header-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 18px auto 0;
    width: fit-content;
  }
  .ms-header-line {
    width: 52px;
    height: 0.5px;
    background: rgba(232,160,69,0.3);
  }
  .ms-header-diamond {
    width: 5px;
    height: 5px;
    background: #e8a045;
    transform: rotate(45deg);
    opacity: 0.75;
    flex-shrink: 0;
  }

  /* ── Grid ── */
  .ms-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ── Card — all equal, image fills background ── */
  .ms-card {
    position: relative;
    height: 300px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--border);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  .ms-card:hover {
    border-color: #3a2010;
    transform: translateY(-3px);
  }

  /* Full-cover background image */
  .ms-food-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ms-card:hover .ms-food-img {
    transform: scale(1.06);
  }

  /* Dark gradient overlay — stronger at bottom-left where text lives */
  .ms-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(8,4,0,0.82) 0%,
      rgba(8,4,0,0.55) 50%,
      rgba(8,4,0,0.15) 100%
    );
    z-index: 1;
    transition: opacity 0.3s ease;
  }
  .ms-card:hover .ms-overlay {
    background: linear-gradient(
      135deg,
      rgba(8,4,0,0.88) 0%,
      rgba(8,4,0,0.6) 50%,
      rgba(8,4,0,0.2) 100%
    );
  }

  /* Accent underline on hover */
  .ms-line {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--accent) 0%, transparent 60%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    z-index: 4;
  }
  .ms-card:hover .ms-line { transform: scaleX(1); }

  /* Spinning discount badge */
  .ms-badge {
    position: absolute;
    top: 16px; right: 16px;
    z-index: 5;
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--accent);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: ms-spin 8s linear infinite;
  }
  .ms-badge-num { font-family: 'Bebas Neue', sans-serif; font-size: 17px; color: #fff; line-height: 1; }
  .ms-badge-off { font-family: 'Bebas Neue', sans-serif; font-size: 8px; letter-spacing: 0.05em; color: #ffccbb; line-height: 1; }

  /* Content pinned bottom-left — same for every card */
  .ms-content {
    position: absolute;
    inset: 0;
    z-index: 3;
    padding: 20px 24px 22px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  /* Tag */
  .ms-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
    margin-bottom: 10px;
    width: fit-content;
  }
  .ms-tag--hot     { background: #e8410a18; color: #e8410a; border: 1px solid #e8410a40; }
  .ms-tag--new     { background: #f7a23418; color: #f7a234; border: 1px solid #f7a23440; }
  .ms-tag--fresh   { background: #3aaa6618; color: #4dcc7a; border: 1px solid #3aaa6640; }
  .ms-tag--special { background: #e8b06a18; color: #e8b06a; border: 1px solid #e8b06a40; }
  .ms-tag--promo   { background: #e8410a18; color: #ff7a5a; border: 1px solid #e8410a30; }

  /* Stars */
  .ms-stars { display: flex; gap: 2px; margin-bottom: 8px; }
  .ms-star {
    width: 9px; height: 9px;
    background: var(--accent2);
    clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
  }
  .ms-star--dim { opacity: 0.3; }

  /* Title */
  .ms-card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(26px, 2.8vw, 38px);
    letter-spacing: 0.04em;
    line-height: 0.95;
    color: var(--text);
    margin-bottom: 6px;
  }

  /* Subtitle */
  .ms-card-sub {
    font-size: 12px;
    font-weight: 300;
    color: rgba(240,232,220,0.55);
    line-height: 1.45;
    margin-bottom: 16px;
  }

  /* Footer */
  .ms-footer {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .ms-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.06em;
    color: var(--text);
    line-height: 1;
  }
  .ms-old-price {
    font-size: 12px;
    color: var(--muted);
    text-decoration: line-through;
    margin-left: 4px;
    font-weight: 300;
  }
  .ms-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--accent);
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 9px 16px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .ms-btn:hover { background: #ff5520; transform: translateY(-1px); }
  .ms-btn--ghost {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(240,232,220,0.6);
  }
  .ms-btn--ghost:hover { border-color: var(--accent); color: var(--accent); background: transparent; transform: none; }

  /* Divider */
  .ms-divider {
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 1200px;
    margin: 48px auto 0;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }
  .ms-divider-text {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }
  .ms-divider-line { flex: 1; height: 1px; background: var(--border); }
  .ms-divider-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid #2e2010;
    color: #7a6048;
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 11px 22px;
    cursor: pointer;
    border-radius: 2px;
    transition: border-color 0.2s, color 0.2s;
  }
  .ms-divider-btn:hover { border-color: var(--accent); color: var(--accent); }

  @keyframes ms-spin { to { transform: rotate(360deg); } }
  .ms-anim { opacity: 0; transform: translateY(18px); animation: ms-rise 0.7s ease forwards; }
  @keyframes ms-rise { to { opacity: 1; transform: none; } }

  @media (max-width: 900px) {
    .ms-grid { grid-template-columns: repeat(2, 1fr); }
    .ms-card { height: 260px; }
  }
  @media (max-width: 520px) {
    .ms-grid { grid-template-columns: 1fr; gap: 10px; }
    .ms-card { height: 240px; }
    .ms-body { padding: 32px 16px; }
  }
`;

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const FireIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-1 3-4 5-4 9a4 4 0 0 0 8 0c0-4-3-6-4-9z" />
  </svg>
);
const LeafIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6 8 4 13 4 16a8 8 0 0 0 16 0c0-3-2-8-8-14z" />
  </svg>
);
const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="ms-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`ms-star${i >= full && !(i === full && hasHalf) ? " ms-star--dim" : ""}`} />
      ))}
    </div>
  );
};

const ShowcaseCard = ({ item }: { item: MenuItem }) => {
  const isGhost = item.id === "pasta";
  return (
    <div className="ms-card">
      <img className="ms-food-img" src={item.image} alt={item.title.join(" ")} loading="lazy" />
      <div className="ms-overlay" />
      <div className="ms-line" />

      {item.discount && (
        <div className="ms-badge">
          <span className="ms-badge-num">{item.discount}</span>
          <span className="ms-badge-off">OFF</span>
        </div>
      )}

      <div className="ms-content">
        <div className={`ms-tag ms-tag--${item.tag.variant}`}>
          {item.tag.variant === "hot" && <FireIcon />}
          {item.tag.variant === "fresh" && <LeafIcon />}
          {item.tag.label}
        </div>
        {item.rating && <Stars rating={item.rating} />}
        <h3 className="ms-card-title">
          {item.title[0]}<br />{item.title[1]}
        </h3>
        <p className="ms-card-sub">{item.sub}</p>
        <div className="ms-footer">
          <div>
            <span className="ms-price">{item.price}</span>
            {item.oldPrice && <span className="ms-old-price">{item.oldPrice}</span>}
          </div>
          <button className={`ms-btn${isGhost ? " ms-btn--ghost" : ""}`}>
            {isGhost ? "View" : "Order Now"}
            {!isGhost && <ArrowIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MenuShowcase() {
  return (
    <>
      <style>{globalCSS}</style>
      <div className="ms-body">
        <header className="ms-header ms-anim" style={{ animationDelay: "0s" }}>
          <span className="ms-eyebrow">From the Kitchen</span>
          <h2 className="ms-title">
            Our <span className="ms-title-accent">Specialties</span>
          </h2>
          <div className="ms-header-divider">
            <div className="ms-header-line" />
            <div className="ms-header-diamond" />
            <div className="ms-header-line" />
          </div>
        </header>

        <div className="ms-grid">
          {MENU_ITEMS.map((item, i) => (
            <div key={item.id} className="ms-anim" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>

        <div className="ms-divider ms-anim" style={{ animationDelay: "0.7s" }}>
          <span className="ms-divider-text">View full menu</span>
          <div className="ms-divider-line" />
          <button className="ms-divider-btn">All Categories <ArrowIcon /></button>
        </div>
      </div>
    </>
  );
}