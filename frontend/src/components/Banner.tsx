const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E2C97E;
    --bg: #0c0d0f;
    --white: #F5F0E8;
    --muted: rgba(245,240,232,0.55);
  }

  body { background: var(--bg); }

  .banner-section {
    background: var(--bg);
    padding: 0 60px;
    margin: 40px 0;
    display: grid;
    grid-template-columns: 1.15fr 1fr 0.85fr;
    grid-template-rows: 1fr 1fr;
    gap: 3px;
    height: 400px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }

  /* ── PANEL BASE ── */
  .panel {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .panel img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 7s ease;
  }

  .panel:hover img { transform: scale(1.07); }

  /* dark overlay */
  .panel::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    transition: opacity 0.4s;
  }

  /* ── PANEL 1 — Sea Food (tall, left, spans 2 rows) ── */
  .panel-1 {
    grid-row: 1 / 3;
    grid-column: 1;
  }

  .panel-1::before {
    background: linear-gradient(135deg, rgba(10,9,8,0.72) 0%, rgba(10,9,8,0.2) 60%, transparent 100%);
  }

  .panel-1:hover::before { opacity: 0.6; }

  /* ── PANEL 2 — Hot Sushi (wide, center top) ── */
  .panel-2 {
    grid-row: 1;
    grid-column: 2;
  }

  .panel-2::before {
    background: linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.1) 60%, transparent 100%);
  }

  /* ── PANEL 3 — Exclusive Sushi (center bottom) ── */
  .panel-3 {
    grid-row: 2;
    grid-column: 2;
  }

  .panel-3::before {
    background: linear-gradient(180deg, transparent 30%, rgba(10,9,8,0.75) 100%);
  }

  /* ── PANEL 4 — right (spans 2 rows) ── */
  .panel-4 {
    grid-row: 1 / 3;
    grid-column: 3;
  }

  .panel-4::before {
    background: linear-gradient(180deg, transparent 20%, rgba(10,9,8,0.78) 100%);
  }

  /* ── CONTENT ── */
  .panel-content {
    position: absolute;
    z-index: 2;
    pointer-events: none;
  }

  /* panel 1 — bottom-left */
  .panel-1 .panel-content {
    bottom: 36px; left: 36px;
    max-width: 280px;
  }

  /* panel 2 — top-left inside */
  .panel-2 .panel-content {
    top: 28px; left: 28px;
  }

  /* panel 3 — bottom-left */
  .panel-3 .panel-content {
    bottom: 24px; left: 24px;
  }

  /* panel 4 — bottom-left */
  .panel-4 .panel-content {
    bottom: 32px; left: 24px;
    right: 24px;
  }

  /* typography */
  .panel-tag {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .panel-tag::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: var(--gold);
  }

  .panel-title {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    color: var(--white);
    line-height: 1.05;
    letter-spacing: -0.5px;
  }

  .panel-title.lg { font-size: clamp(34px, 3.5vw, 54px); }
  .panel-title.md { font-size: clamp(20px, 2vw, 30px); }
  .panel-title.sm { font-size: clamp(16px, 1.6vw, 22px); }

  .panel-title em {
    font-style: italic;
    color: var(--gold-light);
  }

  .panel-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.75;
    color: var(--muted);
    margin-top: 10px;
    max-width: 240px;
  }

  .panel-divider {
    width: 36px; height: 1.5px;
    background: var(--gold);
    margin: 14px 0;
    opacity: 0.7;
  }

  /* CTA link */
  .panel-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-top: 16px;
    pointer-events: all;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    transition: gap 0.3s;
  }

  .panel-cta:hover { gap: 14px; }

  .panel-cta-arrow {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    transition: background 0.3s, border-color 0.3s;
  }

  .panel-cta:hover .panel-cta-arrow {
    background: var(--gold);
    border-color: var(--gold);
    color: #0c0d0f;
  }

  /* price pill */
  .price-pill {
    position: absolute;
    z-index: 3;
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-size: 15px;
    color: #0c0d0f;
    background: var(--gold);
    padding: 6px 14px;
    pointer-events: none;
  }

  .panel-1 .price-pill { top: 32px; right: 32px; }
  .panel-4 .price-pill { top: 24px; right: 20px; font-size: 13px; }

  /* corner ornaments */
  .panel::after {
    content: '';
    position: absolute;
    bottom: 10px; right: 10px;
    width: 18px; height: 18px;
    border-right: 1px solid rgba(201,168,76,0.35);
    border-bottom: 1px solid rgba(201,168,76,0.35);
    z-index: 3;
    transition: width 0.3s, height 0.3s, opacity 0.3s;
    pointer-events: none;
  }

  .panel:hover::after { width: 26px; height: 26px; opacity: 1; }

  /* top-left ornament via extra span */
  .corner-tl {
    position: absolute;
    top: 10px; left: 10px;
    width: 18px; height: 18px;
    border-left: 1px solid rgba(201,168,76,0.35);
    border-top: 1px solid rgba(201,168,76,0.35);
    z-index: 3;
    pointer-events: none;
    transition: width 0.3s, height 0.3s;
  }

  .panel:hover .corner-tl { width: 26px; height: 26px; }

  /* stagger entrance */
  .panel { animation: panelIn 0.7s ease both; }
  .panel-1 { animation-delay: 0s; }
  .panel-2 { animation-delay: 0.1s; }
  .panel-3 { animation-delay: 0.2s; }
  .panel-4 { animation-delay: 0.15s; }

  @keyframes panelIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* responsive */
  @media (max-width: 900px) {
    .banner-section {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto;
      height: auto;
    }
    .panel-1 { grid-row: 1; grid-column: 1 / 3; height: 300px; }
    .panel-2 { grid-row: 2; grid-column: 1; height: 220px; }
    .panel-3 { grid-row: 3; grid-column: 1; height: 200px; }
    .panel-4 { grid-row: 2 / 4; grid-column: 2; }
  }

  @media (max-width: 540px) {
    .banner-section { grid-template-columns: 1fr; grid-template-rows: auto; }
    .panel-1,.panel-2,.panel-3,.panel-4 {
      grid-row: auto; grid-column: 1;
      height: 260px;
    }
  }
`;

const panels = [
  {
    cls: "panel-1",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80&fit=crop",
    tag: "Fresh & Premium",
    title: <>sea <em>food</em></>,
    titleSize: "lg",
    desc: "Handpicked from the ocean each morning. Served with our signature house sauce and seasonal greens.",
    price: "$28",
    cta: "Order Now",
  },
  {
    cls: "panel-2",
    img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80&fit=crop",
    tag: "Chef's Special",
    title: <>hot <em>sushi</em></>,
    titleSize: "md",
    desc: null,
    price: null,
    cta: "Explore",
  },
  {
    cls: "panel-3",
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80&fit=crop",
    tag: "Daily Special",
    title: <>sushi <em>roll</em></>,
    titleSize: "sm",
    desc: null,
    price: null,
    cta: null,
  },
  {
    cls: "panel-4",
    img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80&fit=crop",
    tag: "Exclusive",
    title: <>exclusive <em>sushi</em></>,
    titleSize: "md",
    desc: "A curated omakase experience — each piece crafted with precision and served at the perfect temperature.",
    price: "$42",
    cta: "Reserve",
  },
];

export default function BannerSection() {
  return (
    <>
      <style>{styles}</style>
      <section className="banner-section">
        {panels.map((p) => (
          <div className={`panel ${p.cls}`} key={p.cls}>
            <span className="corner-tl" />
            <img src={p.img} alt={p.cls} />

            {p.price && <div className="price-pill">{p.price}</div>}

            <div className="panel-content">
              <p className="panel-tag">{p.tag}</p>
              <h2 className={`panel-title ${p.titleSize}`}>{p.title}</h2>
              {p.desc && (
                <>
                  <div className="panel-divider" />
                  <p className="panel-desc">{p.desc}</p>
                </>
              )}
              {p.cta && (
                <button className="panel-cta">
                  {p.cta}
                  <span className="panel-cta-arrow">→</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}