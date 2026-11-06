/** Etiqueta de sección con eje de plano (ej. "A — Nosotros"). */
export default function Eyebrow({ axis, children, className = "" }: { axis: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="grid h-7 w-7 place-items-center rounded-full border border-current text-[0.65rem] tracking-normal"
      >
        {axis}
      </span>
      <span>{children}</span>
    </p>
  );
}
