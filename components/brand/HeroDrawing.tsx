/**
 * Dibujo lineal de un edificio en elevación que se traza al cargar (CSS, sin JS).
 * Es una ilustración genérica de marca, NO representa una obra real de la empresa.
 */
export default function HeroDrawing({ className = "" }: { className?: string }) {
  const floors = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 600 760"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`draw ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Terreno */}
      <line x1="0" y1="700" x2="600" y2="700" style={{ ["--len" as string]: 600, ["--d" as string]: 0 }} />
      {/* Torre */}
      <rect x="150" y="100" width="260" height="600" style={{ ["--len" as string]: 1720, ["--d" as string]: 100 }} />
      {/* Volumen bajo */}
      <rect x="410" y="420" width="140" height="280" style={{ ["--len" as string]: 840, ["--d" as string]: 300 }} />
      {/* Losas */}
      {floors.map((i) => (
        <line
          key={i}
          x1="150"
          x2="410"
          y1={150 + i * 46}
          y2={150 + i * 46}
          style={{ ["--len" as string]: 260, ["--d" as string]: 400 + i * 60 }}
        />
      ))}
      {/* Montantes de fachada */}
      {[215, 280, 345].map((x, i) => (
        <line key={x} x1={x} x2={x} y1="100" y2="700" style={{ ["--len" as string]: 600, ["--d" as string]: 700 + i * 120 }} />
      ))}
      {/* Volado superior */}
      <polyline points="120,100 440,100 440,80 120,80 120,100" style={{ ["--len" as string]: 680, ["--d" as string]: 900 }} />
      {/* Cota vertical */}
      <g opacity="0.55">
        <line x1="90" y1="80" x2="90" y2="700" style={{ ["--len" as string]: 620, ["--d" as string]: 1300 }} />
        <line x1="82" y1="80" x2="98" y2="80" style={{ ["--len" as string]: 16, ["--d" as string]: 1300 }} />
        <line x1="82" y1="700" x2="98" y2="700" style={{ ["--len" as string]: 16, ["--d" as string]: 1300 }} />
      </g>
      {/* Cota horizontal */}
      <g opacity="0.55">
        <line x1="150" y1="735" x2="550" y2="735" style={{ ["--len" as string]: 400, ["--d" as string]: 1500 }} />
        <line x1="150" y1="727" x2="150" y2="743" style={{ ["--len" as string]: 16, ["--d" as string]: 1500 }} />
        <line x1="550" y1="727" x2="550" y2="743" style={{ ["--len" as string]: 16, ["--d" as string]: 1500 }} />
      </g>
      {/* Ejes */}
      <g opacity="0.3">
        <path className="static" d="M150 40 V760 M410 40 V760" />
      </g>
      <g fill="currentColor" stroke="none" opacity="0.6" fontSize="14" fontFamily="inherit">
        <text x="144" y="28">A</text>
        <text x="404" y="28">B</text>
      </g>
    </svg>
  );
}
