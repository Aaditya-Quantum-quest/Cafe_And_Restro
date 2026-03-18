import { useEffect, useRef, useState, CSSProperties } from "react";

/* ─── inject fonts + keyframes once ─────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; overflow-x: hidden; }
  body { background: #0D0A06; font-family: 'EB Garamond', serif; color: #F5EDD8; cursor: none; }

  @keyframes slowZoom   { from{transform:scale(1.05)} to{transform:scale(1.14)} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeDown   { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeInLeft { from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes scrollLine { 0%{top:-100%} 100%{top:120%} }
  @keyframes pulseDot   { 0%,100%{opacity:.4} 50%{opacity:1} }

  .rh-bg    { position:absolute;inset:0;transform:scale(1.05);animation:slowZoom 20s ease-in-out infinite alternate; }
  .rh-fd    { opacity:0;animation:fadeDown  .9s .3s  ease both; }
  .rh-fu1   { opacity:0;animation:fadeUp    .9s .35s ease both; }
  .rh-fu2   { opacity:0;animation:fadeUp   1.0s .55s ease both; }
  .rh-fu3   { opacity:0;animation:fadeUp   1.0s .70s ease both; }
  .rh-fu4   { opacity:0;animation:fadeUp   1.0s .85s ease both; }
  .rh-fu5   { opacity:0;animation:fadeUp    .8s 1.0s ease both; }
  .rh-fu6   { opacity:0;animation:fadeUp    .8s 1.1s ease both; }
  .rh-fu7   { opacity:0;animation:fadeUp    .8s 1.25s ease both; }
  .rh-fu8   { opacity:0;animation:fadeUp    .8s 1.45s ease both; }
  .rh-fl    { opacity:0;animation:fadeInLeft .8s 1.5s ease both; }
  .rh-scroll{ opacity:0;animation:fadeUp    .8s 1.8s ease both; }
  .rh-scfill{ position:absolute;top:-100%;left:0;width:100%;height:100%;background:#C9A84C;animation:scrollLine 2s 2.5s ease infinite; }
  .rh-dot   { animation:pulseDot 2s infinite; }

  .rh-nav-link {
    font-family:'Cinzel',serif; font-size:10px; letter-spacing:.25em;
    color:rgba(213,196,160,.65); text-decoration:none; transition:color .3s;
    position:relative; padding-bottom:4px; display:inline-block;
  }
  .rh-nav-link::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:1px; background:#C9A84C; transform:scaleX(0);
    transition:transform .3s; transform-origin:left; display:block;
  }
  .rh-nav-link:hover { color:#E8C97A; }
  .rh-nav-link:hover::after { transform:scaleX(1); }
`;

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const T = {
  gold:    "#C9A84C",
  goldLt:  "#E8C97A",
  goldDim: "#8B6B2A",
  cream:   "#F5EDD8",
  dark:    "#0D0A06",
  body:    "#D4C4A0",
  cinzel:  "'Cinzel', serif",
  cg:      "'Cormorant Garamond', serif",
  eb:      "'EB Garamond', serif",
} as const;

/* ─── tiny helpers ───────────────────────────────────────────────────────── */
function HoverLink({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return <a href="#" className="rh-nav-link" style={style}>{children}</a>;
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, margin:"24px 0" }}>
      <div style={{ flex:1, height:1, background:`linear-gradient(to right,${T.goldDim},transparent)` }} />
      <div style={{ width:6, height:6, border:`1px solid ${T.gold}`, transform:"rotate(45deg)" }} />
      <div style={{ flex:1, height:1, background:`linear-gradient(to left,${T.goldDim},transparent)` }} />
    </div>
  );
}

/* ─── CTA buttons ────────────────────────────────────────────────────────── */
function PrimaryBtn({ label }: { label: string }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily:T.cinzel, fontSize:10, letterSpacing:".3em",
        color: h ? T.gold : T.dark, background:T.gold,
        padding:"18px 36px", cursor:"none", position:"relative",
        overflow:"hidden", transition:"color .4s", textTransform:"uppercase",
        textDecoration:"none", display:"inline-block", whiteSpace:"nowrap" }}>
      <span style={{ position:"absolute", inset:0, background:T.dark,
        transform: h ? "translateX(0)" : "translateX(-105%)",
        transition:"transform .4s cubic-bezier(.77,0,.18,1)" }} />
      <span style={{ position:"relative", zIndex:1 }}>{label}</span>
    </a>
  );
}

function GhostBtn({ label }: { label: string }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily:T.cinzel, fontSize:10, letterSpacing:".25em",
        color: h ? T.goldLt : T.cream, textDecoration:"none",
        display:"flex", alignItems:"center", gap: h ? 20 : 14,
        transition:"color .3s, gap .3s", textTransform:"uppercase",
        whiteSpace:"nowrap", cursor:"none" }}>
      <span style={{ width: h ? 44 : 32, height:1, background:"currentColor",
        transition:"width .3s", display:"block" }} />
      {label}
    </a>
  );
}

/* ─── dish card ──────────────────────────────────────────────────────────── */
const DISHES = [
  { tag:"Signature", name:"Seared Duck Confit",  desc:"Cherry gastrique · Wild mushroom · Truffle jus",    badge:"Chef's Favourite", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
  { tag:"New",       name:"Lobster Bisque",       desc:"Cognac cream · Tarragon oil · Crisp fennel",        badge:"Seasonal",          img:"https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80" },
  { tag:"Popular",   name:"Wagyu Tenderloin",     desc:"Bone marrow butter · Potato fondant · Herb crust",  badge:"Limited Nightly",   img:"https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80" },
];

function DishCard({ d, idx }: { d: typeof DISHES[0]; idx: number }) {
  const [h, setH] = useState(false);
  const delay = 0.85 + idx * 0.14;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ borderTop:`1px solid ${h ? "rgba(201,168,76,.45)" : "rgba(201,168,76,.18)"}`,
        padding:"14px 0", display:"flex", gap:14, alignItems:"center",
        opacity:0, animation:`fadeInLeft .8s ${delay}s ease both`,
        cursor:"none", transition:"border-color .3s" }}>
      {/* thumb */}
      <div style={{ width:68, height:68, borderRadius:2, overflow:"hidden", flexShrink:0,
        border:"1px solid rgba(201,168,76,.14)",
        transform: h ? "scale(1.05)" : "scale(1)", transition:"transform .4s" }}>
        <img src={d.img} alt={d.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>
      {/* text */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
          <span style={{ fontFamily:T.cinzel, fontSize:7, letterSpacing:".3em", color:T.gold, textTransform:"uppercase" }}>{d.tag}</span>
          <span style={{ width:18, height:1, background:"rgba(201,168,76,.3)", display:"block" }} />
        </div>
        <div style={{ fontFamily:T.cg, fontStyle:"italic", fontWeight:300, fontSize:18,
          color: h ? T.goldLt : T.cream, lineHeight:1.2, transition:"color .3s", marginBottom:3 }}>{d.name}</div>
        <div style={{ fontFamily:T.eb, fontSize:12, color:"rgba(212,196,160,.55)", lineHeight:1.5 }}>{d.desc}</div>
      </div>
      {/* badge */}
      <div style={{ fontFamily:T.cinzel, fontSize:7, letterSpacing:".18em",
        color: h ? T.dark : T.gold, background: h ? T.gold : "transparent",
        border:"1px solid rgba(201,168,76,.35)", padding:"5px 9px",
        textTransform:"uppercase", whiteSpace:"nowrap", flexShrink:0,
        alignSelf:"flex-start", transition:"all .3s" }}>{d.badge}</div>
    </div>
  );
}

/* ─── right panel ────────────────────────────────────────────────────────── */
const TABS = [
  { label:"Reservations", title:"Book Your Table",
    body:"Reserve an intimate corner, a window seat overlooking the garden, or our private dining room for special occasions.",
    cta:"Check Availability" },
  { label:"Hours", title:"Open Daily",
    body:"Breakfast 7–11 AM · Lunch 12–3 PM\nAfternoon Tea 3–5 PM\nDinner 6 PM – Midnight\nBar until 2 AM",
    cta:"Plan Your Visit" },
  { label:"Events", title:"Private Dining",
    body:"Celebrate life's milestones in our beautifully appointed private dining room, seating up to 24 guests.",
    cta:"Enquire Now" },
];

function RightPanel() {
  const [tab, setTab] = useState(0);
  const t = TABS[tab];
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", gap:0 }}>
      {/* ornament */}
      <div className="rh-fl" style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <div style={{ width:34, height:34, border:"1px solid rgba(201,168,76,.35)", borderRadius:"50%",
          display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
          <div style={{ position:"absolute", inset:5, border:"1px solid rgba(201,168,76,.18)", borderRadius:"50%" }} />
          <span style={{ color:T.gold, fontSize:13 }}>✦</span>
        </div>
        <span style={{ fontFamily:T.cinzel, fontSize:8, letterSpacing:".32em", color:"rgba(201,168,76,.55)", textTransform:"uppercase" }}>Est. 2012 · Paris Inspired</span>
      </div>

      {/* tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:20, borderBottom:"1px solid rgba(201,168,76,.12)" }}>
        {TABS.map((tb, i) => (
          <button key={tb.label} onClick={() => setTab(i)}
            style={{ fontFamily:T.cinzel, fontSize:9, letterSpacing:".2em", textTransform:"uppercase",
              color: tab===i ? T.gold : "rgba(213,196,160,.4)",
              background:"transparent", border:"none",
              borderBottom: tab===i ? `1px solid ${T.gold}` : "1px solid transparent",
              padding:"8px 14px 10px", cursor:"none", transition:"color .3s", marginBottom:-1 }}>
            {tb.label}
          </button>
        ))}
      </div>

      {/* content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <h3 style={{ fontFamily:T.cg, fontStyle:"italic", fontWeight:300, fontSize:26, color:T.cream, lineHeight:1.2, marginBottom:12 }}>{t.title}</h3>
          <p style={{ fontFamily:T.eb, fontSize:14, lineHeight:1.8, color:"rgba(212,196,160,.7)", whiteSpace:"pre-line" }}>{t.body}</p>
        </div>
        <a href="#" style={{ fontFamily:T.cinzel, fontSize:9, letterSpacing:".22em", color:T.gold,
          textDecoration:"none", textTransform:"uppercase", display:"flex", alignItems:"center",
          gap:10, marginTop:18, paddingTop:14, borderTop:"1px solid rgba(201,168,76,.12)" }}>
          <span style={{ width:22, height:1, background:T.gold, display:"block" }} />
          {t.cta} →
        </a>
      </div>

      {/* quote */}
      <div style={{ marginTop:24, padding:"16px 18px",
        border:"1px solid rgba(201,168,76,.18)", background:"rgba(201,168,76,.04)", position:"relative" }}>
        <span style={{ position:"absolute", top:-13, left:14, fontFamily:T.cg, fontSize:46,
          color:T.gold, lineHeight:1, opacity:.45 }}>"</span>
        <p style={{ fontFamily:T.cg, fontStyle:"italic", fontSize:14.5, lineHeight:1.65,
          color:"rgba(245,237,216,.72)", marginTop:6 }}>
          An experience that transcends mere dining — every detail speaks of devotion.
        </p>
        <p style={{ fontFamily:T.cinzel, fontSize:8, letterSpacing:".22em", color:"rgba(201,168,76,.45)",
          textTransform:"uppercase", marginTop:10 }}>— Le Monde Culinaire, 2024</p>
      </div>

      {/* social proof row */}
      <div style={{ display:"flex", gap:20, marginTop:18 }}>
        {[["Michelin","Guide"],["James Beard","Finalist"],["Condé Nast","Top 50"]].map(([a,b]) => (
          <div key={a} style={{ flex:1, borderTop:`1px solid rgba(201,168,76,.18)`, paddingTop:10 }}>
            <div style={{ fontFamily:T.cinzel, fontSize:7, letterSpacing:".2em", color:T.gold, textTransform:"uppercase", marginBottom:2 }}>{a}</div>
            <div style={{ fontFamily:T.eb, fontSize:11, color:"rgba(212,196,160,.5)" }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const raf     = useRef(0);
  const mouse   = useRef({ x:0, y:0 });
  const ringPos = useRef({ x:0, y:0 });
  const [ringBig, setRingBig] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);

    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", move);

    const tick = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top  = ringPos.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
      document.head.removeChild(el);
    };
  }, []);

  const rs = ringBig ? 52 : 32;

  return (
    <>
      {/* cursor dot */}
      <div ref={dotRef} style={{
        position:"fixed", top:0, left:0, width:8, height:8,
        background:T.gold, borderRadius:"50%", pointerEvents:"none",
        zIndex:9999, transform:"translate(-50%,-50%)",
      }} />
      {/* cursor ring */}
      <div ref={ringRef} style={{
        position:"fixed", top:0, left:0, width:rs, height:rs,
        border:"1px solid rgba(201,168,76,.5)", borderRadius:"50%",
        pointerEvents:"none", zIndex:9998,
        transform:"translate(-50%,-50%)",
        transition:"width .25s, height .25s",
      }} />

      {/* ── HERO ── */}
      <section style={{
        position:"relative", width:"100%", height:"100vh", minHeight:680,
        overflow:"hidden", display:"flex", flexDirection:"column",
      }}>
        {/* bg photo */}
        <div className="rh-bg" style={{
          backgroundImage:`
            linear-gradient(105deg,rgba(10,7,3,.93) 0%,rgba(10,7,3,.58) 45%,rgba(10,7,3,.3) 100%),
            url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80')`,
          backgroundSize:"cover", backgroundPosition:"center",
        }} />
        {/* grain */}
        <div style={{
          position:"absolute", inset:0, opacity:.028, pointerEvents:"none",
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
        {/* column guide lines */}
        {[33.33, 66.66].map(p => (
          <div key={p} style={{
            position:"absolute", top:0, bottom:0, left:`${p}%`, width:1,
            background:"linear-gradient(to bottom,transparent,rgba(201,168,76,.07) 25%,rgba(201,168,76,.07) 75%,transparent)",
            pointerEvents:"none",
          }} />
        ))}

        {/* ── NAV ── */}
        <nav className="rh-fd" style={{
          position:"relative", zIndex:10, padding:"26px 48px",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:44, height:44, border:`1px solid ${T.goldDim}`, borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <div style={{ position:"absolute", inset:5, border:"1px solid rgba(201,168,76,.22)", borderRadius:"50%" }} />
              <span style={{ color:T.gold, fontSize:15 }}>✦</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <span style={{ fontFamily:T.cinzel, fontSize:11, letterSpacing:".25em", color:T.cream }}>Maison Dorée</span>
              <span style={{ fontFamily:T.cinzel, fontSize:8, letterSpacing:".3em", color:T.goldDim, textTransform:"uppercase" }}>Fine Dining · Café · Bar</span>
            </div>
          </div>

          <ul style={{ display:"flex", alignItems:"center", gap:32, listStyle:"none" }}
            onMouseEnter={() => setRingBig(true)} onMouseLeave={() => setRingBig(false)}>
            {["Menu","Story","Events","Gallery"].map(l => (
              <li key={l}><HoverLink>{l}</HoverLink></li>
            ))}
          </ul>

          <div style={{ fontFamily:T.cinzel, fontSize:10, letterSpacing:".12em",
            color:T.dark, background:T.gold, padding:"9px 20px",
            display:"flex", alignItems:"center", gap:6 }}>
            <span>★</span> 4.9 Rating
          </div>
        </nav>

        {/* ── 3-COLUMN BODY ── */}
        <div style={{
          position:"relative", zIndex:5, flex:1,
          display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
          minHeight:0,
        }}>

          {/* LEFT */}
          <div style={{ padding:"28px 48px 36px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div>
              <div className="rh-fu1" style={{ fontFamily:T.cinzel, fontSize:9.5, letterSpacing:".38em",
                color:T.gold, textTransform:"uppercase", marginBottom:22,
                display:"flex", alignItems:"center", gap:14 }}>
                <span style={{ width:28, height:1, background:T.gold, display:"block" }} />
                Award Winning
              </div>

              <h1 style={{ fontFamily:T.cg, fontSize:"clamp(52px,5.2vw,84px)", lineHeight:1.0,
                letterSpacing:"-.01em", color:T.cream, marginBottom:16 }}>
                <span className="rh-fu2" style={{ display:"block", fontWeight:300 }}>Taste the</span>
                <span className="rh-fu3" style={{ display:"block", fontStyle:"italic", fontWeight:300, color:T.goldLt }}>Soul of the</span>
                <span className="rh-fu4" style={{ display:"block", fontWeight:300 }}>Kitchen</span>
              </h1>

              <div className="rh-fu5"><Divider /></div>

              <p className="rh-fu6" style={{ fontFamily:T.eb, fontSize:16, lineHeight:1.78,
                color:T.body, maxWidth:340, marginBottom:36 }}>
                From handcrafted espresso to slow-braised mains — every plate and cup is made with honest ingredients and real passion.
              </p>

              <div className="rh-fu7" style={{ display:"flex", alignItems:"center", gap:28 }}
                onMouseEnter={() => setRingBig(true)} onMouseLeave={() => setRingBig(false)}>
                <PrimaryBtn label="Reserve a Table" />
                <GhostBtn label="Our Menu" />
              </div>
            </div>

            {/* stats */}
            <div className="rh-fu8" style={{ display:"flex", alignItems:"flex-end", gap:32,
              paddingTop:28, borderTop:"1px solid rgba(201,168,76,.1)" }}>
              {[["12","+","Years of Craft"],["4.9","★","Guest Rating"],["60","+","Dishes on Menu"]].map(([n,s,l]) => (
                <div key={l} style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontFamily:T.cg, fontSize:34, fontWeight:300, color:T.cream,
                    lineHeight:1, display:"flex", alignItems:"flex-start", gap:2 }}>
                    {n}<sup style={{ fontSize:12, color:T.gold, marginTop:5 }}>{s}</sup>
                  </div>
                  <div style={{ fontFamily:T.cinzel, fontSize:7.5, letterSpacing:".28em",
                    color:T.goldDim, textTransform:"uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE */}
          <div style={{ padding:"28px 32px 36px",
            borderLeft:"1px solid rgba(201,168,76,.08)", borderRight:"1px solid rgba(201,168,76,.08)",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            background:"rgba(0,0,0,.22)", backdropFilter:"blur(3px)" }}>
            <div>
              <div className="rh-fu1" style={{ display:"flex", alignItems:"center",
                justifyContent:"space-between", marginBottom:24 }}>
                <span style={{ fontFamily:T.cinzel, fontSize:9, letterSpacing:".32em",
                  color:T.gold, textTransform:"uppercase" }}>Tonight's Selection</span>
                <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span className="rh-dot" style={{ width:5, height:5, background:T.gold,
                    borderRadius:"50%", display:"block" }} />
                  <span style={{ fontFamily:T.cinzel, fontSize:7.5, letterSpacing:".22em",
                    color:"rgba(201,168,76,.45)", textTransform:"uppercase" }}>Live Kitchen</span>
                </span>
              </div>
              {DISHES.map((d, i) => <DishCard key={i} d={d} idx={i} />)}
            </div>
            <div style={{ paddingTop:18, borderTop:"1px solid rgba(201,168,76,.1)",
              display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontFamily:T.eb, fontSize:13, color:"rgba(212,196,160,.45)", fontStyle:"italic" }}>
                Menus change with the seasons
              </span>
              <a href="#" style={{ fontFamily:T.cinzel, fontSize:8, letterSpacing:".22em",
                color:T.gold, textDecoration:"none", textTransform:"uppercase",
                display:"flex", alignItems:"center", gap:8 }}>
                Full Menu <span style={{ width:20, height:1, background:T.gold, display:"block" }} />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ padding:"28px 36px 36px",
            background:"rgba(0,0,0,.3)", backdropFilter:"blur(6px)",
            display:"flex", flexDirection:"column" }}>
            <RightPanel />
          </div>
        </div>

        {/* scroll indicator */}
        <div className="rh-scroll" style={{
          position:"absolute", bottom:30, left:"50%", transform:"translateX(-50%)",
          zIndex:5, display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        }}>
          <div style={{ width:1, height:48, background:"rgba(201,168,76,.14)", position:"relative", overflow:"hidden" }}>
            <div className="rh-scfill" />
          </div>
          <span style={{ fontFamily:T.cinzel, fontSize:7, letterSpacing:".34em",
            color:T.goldDim, writingMode:"vertical-rl", textTransform:"uppercase" }}>Scroll</span>
        </div>
      </section>
    </>
  );
}