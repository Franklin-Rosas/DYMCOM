/** Cota de plano: línea con remates y etiqueta. Elemento gráfico de marca (decorativo). */
export default function Dimension({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-3 w-px bg-current" />
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="label whitespace-nowrap">{label}</span>
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="h-3 w-px bg-current" />
    </div>
  );
}
