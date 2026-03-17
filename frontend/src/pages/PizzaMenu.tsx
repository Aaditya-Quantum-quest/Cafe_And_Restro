import React from "react";

interface Pizza {
  id: number;
  name: string;
  description: string;
  regular: number;
  large: number;
  image: string;
  imagePosition: "left" | "right";
}

const pizzas: Pizza[] = [
  {
    id: 1,
    name: "Margherita",
    description: "Tomato sauce, Mozzarella cheese, oregano and fresh basil.",
    regular: 29,
    large: 35,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
    imagePosition: "left",
  },
  {
    id: 2,
    name: "Classic Burrata",
    description:
      "Tomato sauce, Burrata, Parmesan & mozzarella cheese, Fresh Arugula, Ricotta cheese and fresh basil pesto.",
    regular: 29,
    large: 35,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    imagePosition: "right",
  },
  {
    id: 3,
    name: "Diavola",
    description:
      "Tomato sauce, Fior di latte, spicy salami, chili flakes and fresh basil.",
    regular: 31,
    large: 38,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
    imagePosition: "left",
  },
  {
    id: 4,
    name: "Quattro Formaggi",
    description:
      "Mozzarella, Gorgonzola, Parmesan, Taleggio and a drizzle of truffle honey.",
    regular: 33,
    large: 40,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    imagePosition: "right",
  },
];

const styles: string = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #0d0d0d;
  }

  .menu-wrapper {
    background-color: #0d0d0d;
    background-image:
      radial-gradient(ellipse at 20% 20%, rgba(180, 30, 30, 0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(180, 30, 30, 0.03) 0%, transparent 60%);
    min-height: 100vh;
    font-family: 'Cormorant Garamond', serif;
    color: #f0ece4;
    padding: 0 0 80px;
  }

  /* HEADER */
  .menu-header {
    text-align: center;
    padding: 60px 20px 40px;
    position: relative;
  }

  .menu-header::after {
    content: '';
    display: block;
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c8a96e, transparent);
    margin: 20px auto 0;
  }

  .ristorante-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 14px;
  }

  .menu-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 600;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #f0ece4;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .menu-title .dot {
    color: #c8a96e;
    font-size: 1.2rem;
  }

  .menu-subtitle {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #6b6355;
    margin-top: 14px;
  }

  /* ITEMS */
  .menu-items {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .menu-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    min-height: 340px;
    position: relative;
    opacity: 0;
    animation: fadeSlideIn 0.7s forwards;
  }

  .menu-item:nth-child(1) { animation-delay: 0.1s; }
  .menu-item:nth-child(2) { animation-delay: 0.2s; }
  .menu-item:nth-child(3) { animation-delay: 0.3s; }
  .menu-item:nth-child(4) { animation-delay: 0.4s; }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Image side */
  .pizza-image-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px;
  }

  .pizza-image-ring {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    border: 1px solid rgba(200, 169, 110, 0.2);
    padding: 8px;
    position: relative;
    transition: border-color 0.3s;
  }

  .menu-item:hover .pizza-image-ring {
    border-color: rgba(200, 169, 110, 0.5);
  }

  .pizza-image-ring::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1px dashed rgba(200, 169, 110, 0.12);
  }

  .pizza-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
    filter: brightness(0.92) saturate(1.1);
  }

  .menu-item:hover .pizza-image {
    transform: scale(1.04);
  }

  /* Details side */
  .pizza-details {
    padding: 36px 40px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .pizza-details.align-right {
    text-align: right;
    align-items: flex-end;
  }

  .pizza-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 600;
    color: #f0ece4;
    line-height: 1.2;
  }

  .pizza-desc {
    font-size: 0.92rem;
    font-weight: 300;
    color: #9a8f7e;
    line-height: 1.7;
    max-width: 300px;
    font-style: italic;
  }

  .price-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 6px;
  }

  .price-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .price-row.right-align {
    justify-content: flex-end;
  }

  .size-badge {
    background: #1e1a14;
    border: 1px solid rgba(200, 169, 110, 0.25);
    color: #9a8f7e;
    font-family: 'Cormorant Garamond', serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
  }

  .price-value {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: #f0ece4;
  }

  .price-value::before {
    content: '$';
    font-size: 0.85rem;
    color: #c8a96e;
    vertical-align: super;
    margin-right: 2px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200, 169, 110, 0.15), transparent);
    margin: 10px 0;
  }

  /* Alternating layout */
  .menu-item.reverse .pizza-image-wrap {
    order: 2;
  }
  .menu-item.reverse .pizza-details {
    order: 1;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .menu-item {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .menu-item.reverse .pizza-image-wrap { order: 0; }
    .menu-item.reverse .pizza-details { order: 1; }

    .pizza-details { padding: 0 20px 30px; }
    .pizza-details.align-right { align-items: flex-start; text-align: left; }
    .price-row.right-align { justify-content: flex-start; }
    .pizza-image-ring { width: 220px; height: 220px; }
    .pizza-image-wrap { padding: 24px; }
  }
`;

interface PizzaCardProps {
  pizza: Pizza;
  index: number;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, index, }) => {
  const isRight: boolean = pizza.imagePosition === "right";

  return (
    <div>
      <div className={`menu-item${isRight ? " reverse" : ""}`}>
        {/* Image */}
        <div className="pizza-image-wrap">
          <div className="pizza-image-ring">
            <img
              src={pizza.image}
              alt={pizza.name}
              className="pizza-image"
            />
          </div>
        </div>

        {/* Details */}
        <div className={`pizza-details${isRight ? "" : " align-right"}`}>
          <h2 className="pizza-name">{pizza.name}</h2>
          <p className="pizza-desc">{pizza.description}</p>
          <div className="price-grid">
            <div className={`price-row${isRight ? "" : " right-align"}`}>
              <span className="size-badge">Regular Size</span>
              <span className="price-value">{pizza.regular}</span>
            </div>
            <div className={`price-row${isRight ? "" : " right-align"}`}>
              <span className="size-badge">Medium Size</span>
              <span className="price-value">{pizza.large}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PizzaMenu: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="menu-wrapper">
        <header className="menu-header">
          <p className="ristorante-label">Ristorante</p>
          <h1 className="menu-title">
            <span className="dot">•</span>
            Pizza Menu
            <span className="dot">•</span>
          </h1>
          <p className="menu-subtitle">Our Best Selections</p>
        </header>

        <div className="menu-items">
          {pizzas.map((pizza: Pizza, i: number) => (
            <React.Fragment key={pizza.id}>
              <PizzaCard pizza={pizza} index={i} />
              {i < pizzas.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default PizzaMenu;