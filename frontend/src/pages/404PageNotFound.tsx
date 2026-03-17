import React from "react";

const styles: string = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Outfit:wght@300;400;500&display=swap');

  .nf-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0e0804;
    padding: 60px 20px;
    position: relative;
    overflow: hidden;
  }

  .nf-glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  .nf-glow--center {
    width: 560px;
    height: 560px;
    background: #c45c1a;
    opacity: 0.06;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .nf-glow--bottom {
    width: 260px;
    height: 260px;
    background: #e8a045;
    opacity: 0.05;
    bottom: -80px;
    right: -60px;
  }

  .nf-inner {
    text-align: center;
    max-width: 480px;
    position: relative;
    z-index: 1;
  }

  /* ── Ornament ── */
  .nf-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 32px;
    opacity: 0;
    animation: nfRise 0.6s 0.1s forwards;
  }

  .nf-line {
    flex: 1;
    max-width: 70px;
    height: 0.5px;
    background: linear-gradient(90deg, transparent, rgba(232,160,69,0.5));
  }

  .nf-line-right {
    flex: 1;
    max-width: 70px;
    height: 0.5px;
    background: linear-gradient(90deg, rgba(232,160,69,0.5), transparent);
  }

  .nf-plate {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 0.5px solid rgba(232, 160, 69, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: rgba(232, 160, 69, 0.04);
  }

  .nf-plate::before {
    content: '';
    position: absolute;
    inset: -7px;
    border-radius: 50%;
    border: 0.5px dashed rgba(232, 160, 69, 0.12);
  }

  .nf-plate svg {
    width: 34px;
    height: 34px;
  }

  /* ── 404 ── */
  .nf-404 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(5rem, 15vw, 8.5rem);
    font-weight: 600;
    color: #f5ede0;
    letter-spacing: 10px;
    line-height: 1;
    margin-bottom: 0;
    opacity: 0;
    animation: nfRise 0.6s 0.25s forwards;
  }

  .nf-404 .nf-accent {
    color: #e8a045;
    font-style: italic;
    font-weight: 300;
  }

  /* ── Divider ── */
  .nf-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px auto;
    opacity: 0;
    animation: nfRise 0.6s 0.35s forwards;
  }

  .nf-divider-line {
    width: 50px;
    height: 0.5px;
    background: rgba(232,160,69,0.25);
  }

  .nf-divider-diamond {
    width: 5px;
    height: 5px;
    background: #e8a045;
    transform: rotate(45deg);
    opacity: 0.7;
    flex-shrink: 0;
  }

  /* ── Label ── */
  .nf-label {
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c87d3a;
    margin-bottom: 14px;
    opacity: 0;
    animation: nfRise 0.6s 0.4s forwards;
  }

  /* ── Title ── */
  .nf-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 600;
    color: #f5ede0;
    line-height: 1.2;
    margin-bottom: 14px;
    opacity: 0;
    animation: nfRise 0.6s 0.45s forwards;
  }

  /* ── Desc ── */
  .nf-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #7a6550;
    font-style: normal;
    line-height: 1.8;
    margin-bottom: 40px;
    opacity: 0;
    animation: nfRise 0.6s 0.5s forwards;
  }

  /* ── Actions ── */
  .nf-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    opacity: 0;
    animation: nfRise 0.6s 0.58s forwards;
  }

  .nf-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 11px 28px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: none;
  }

  .nf-btn-primary {
    background: #e8a045;
    color: #110b04;
    border: 0.5px solid #e8a045;
  }

  .nf-btn-primary:hover {
    background: #f0b050;
    transform: translateY(-1px);
  }

  .nf-btn-ghost {
    background: transparent;
    color: #7a6550;
    border: 0.5px solid rgba(232, 160, 69, 0.2);
  }

  .nf-btn-ghost:hover {
    color: #e8a045;
    border-color: rgba(232, 160, 69, 0.5);
    transform: translateY(-1px);
  }

  /* ── Footer note ── */
  .nf-footnote {
    margin-top: 48px;
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: #3a2a1a;
    letter-spacing: 0.06em;
    opacity: 0;
    animation: nfRise 0.6s 0.7s forwards;
  }

  @keyframes nfRise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const NotFound: React.FC = () => {
  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="nf-wrap">
        <div className="nf-glow nf-glow--center" />
        <div className="nf-glow nf-glow--bottom" />

        <div className="nf-inner">

          {/* Ornament */}
          <div className="nf-ornament">
            <div className="nf-line" />
            <div className="nf-plate">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="13" stroke="#e8a045" strokeWidth="0.7" opacity="0.5"/>
                <circle cx="18" cy="18" r="9"  stroke="#e8a045" strokeWidth="0.5" opacity="0.3"/>
                <path
                  d="M10 18 Q14 13 18 18 Q22 23 26 18"
                  stroke="#e8a045"
                  strokeWidth="0.9"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="18" cy="18" r="1.8" fill="#e8a045" opacity="0.5" />
                <path
                  d="M18 7 L18 5M18 31 L18 29M7 18 L5 18M31 18 L29 18"
                  stroke="#e8a045"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </div>
            <div className="nf-line-right" />
          </div>

          {/* 404 */}
          <div className="nf-404">
            <span className="nf-accent">4</span>0<span className="nf-accent">4</span>
          </div>

          {/* Divider */}
          <div className="nf-divider">
            <div className="nf-divider-line" />
            <div className="nf-divider-diamond" />
            <div className="nf-divider-line" />
          </div>

          <p className="nf-label">Page not found</p>

          <h1 className="nf-title">This dish isn't on the menu</h1>

          <p className="nf-desc">
            The page you're looking for may have been moved,<br />
            renamed, or is simply not available right now.
          </p>

          {/* Actions */}
          <div className="nf-actions">
            <a href="/" className="nf-btn nf-btn-primary">
              Go Home
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" onClick={handleGoBack} className="nf-btn nf-btn-ghost">
              Go Back
            </a>
          </div>

          <p className="nf-footnote">21 Cafe &amp; Restaurant · Est. 2024</p>

        </div>
      </div>
    </>
  );
};

export default NotFound;