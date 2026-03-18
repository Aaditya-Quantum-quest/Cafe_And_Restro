const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@500;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E2C97E;
    --black: #0A0A0A;
    --dark: #141414;
    --white: #F8F4EE;
  }

  body { background: var(--black); }

  .wrapper { 
    display: flex; 
    flex-direction: column;
    padding: 0 60px;
    margin: 40px 0;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }

  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 360px;
  }

  /* image panel */
  .img-panel {
    position: relative;
    overflow: hidden;
  }
  .img-panel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 7s ease;
  }
  .img-panel:hover img { transform: scale(1.05); }
  .img-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.18) 0%, transparent 60%);
    pointer-events: none;
  }

  /* content panel */
  .content-panel {
    background: var(--dark);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 56px;
    position: relative;
    overflow: hidden;
  }
  .content-panel::before {
    content: '';
    position: absolute;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%);
    top: -80px; right: -80px;
    pointer-events: none;
  }

  /* reversed row: content left, image right */
  .split.reverse { direction: rtl; }
  .split.reverse > * { direction: ltr; }
  .split.reverse .content-panel::before {
    top: -80px; right: auto; left: -80px;
  }

  /* typography */
  .overline {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 18px;
  }

  .divider {
    width: 48px; height: 2px;
    background: var(--gold);
    margin-bottom: 28px;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 600;
    line-height: 1.05;
    color: var(--white);
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }

  .section-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.75;
    color: rgba(248,244,238,0.62);
    max-width: 320px;
    margin-bottom: 32px;
  }

  /* buttons */
  .btn-gold {
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 600;
    background: var(--gold);
    color: var(--black);
    padding: 15px 36px;
    border: none;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
  }
  .btn-gold:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(201,168,76,0.22);
  }

  .btn-outline {
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 600;
    background: transparent;
    color: var(--gold);
    padding: 14px 36px;
    border: 1.5px solid var(--gold);
    cursor: pointer;
    transition: background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.3s;
  }
  .btn-outline:hover {
    background: var(--gold);
    color: var(--black);
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(201,168,76,0.2);
  }

  /* animations */
  .fade-left  { animation: fadeLeft  0.9s ease both; }
  .fade-right { animation: fadeRight 0.9s ease both; }
  .fade-img   { animation: fadeIn    1.1s ease both; }

  @keyframes fadeLeft  { from { opacity:0; transform: translateX(-28px); } to { opacity:1; transform: translateX(0); } }
  @keyframes fadeRight { from { opacity:0; transform: translateX(28px);  } to { opacity:1; transform: translateX(0); } }
  @keyframes fadeIn    { from { opacity:0; }                               to { opacity:1; } }

  /* responsive */
  @media (max-width: 860px) {
    .split, .split.reverse { grid-template-columns: 1fr; direction: ltr; }
    .img-panel { min-height: 42vw; }
    .content-panel { padding: 36px 32px; }
    .split.reverse .img-panel { order: -1; }
    .wrapper { padding: 0 24px; }
  }
`;

const RIBS_IMG =
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80&auto=format&fit=crop";
const PASTA_IMG =
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80&auto=format&fit=crop";

export default function FeaturedSection() {
  return (
    <>
      <style>{styles}</style>
      <div className="wrapper">

        {/* Row 1 — image left, content right */}
        <section className="split">
          <div className="img-panel fade-img">
            <img src={RIBS_IMG} alt="Chef's signature ribs" />
          </div>
          <div className="content-panel fade-right">
            <p className="overline">Discover Dining</p>
            <div className="divider" />
            <h2 className="section-title">Chef's Signature<br />Creations</h2>
            <p className="section-desc">
              Savour each meticulously crafted plate — where bold flavours meet
              elegant presentation. Thoughtfully plated, endlessly enjoyed. A
              journey through taste that leaves a lasting impression on every guest.
            </p>
            <button className="btn-gold">Explore</button>
          </div>
        </section>

        {/* Row 2 — content left, image right */}
        <section className="split reverse">
          <div className="img-panel fade-img">
            <img src={PASTA_IMG} alt="Fresh pasta with pesto" />
          </div>
          <div className="content-panel fade-left">
            <p className="overline">Crafted for You</p>
            <div className="divider" />
            <h2 className="section-title">A Full Culinary<br />Experience</h2>
            <p className="section-desc">
              From the first amuse-bouche to the final dessert, every moment at
              our table is considered. Discover seasonal tasting menus, wine
              pairings, and the warmth of a kitchen that cooks with genuine heart.
            </p>
            <button className="btn-outline">Come More</button>
          </div>
        </section>

      </div>
    </>
  );
}