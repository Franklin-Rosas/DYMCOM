/** Grilla tipo plano de fondo, con ejes numerados en el borde superior. */
export default function BlueprintGrid({ className = "" }: { className?: string }) {
  const cols = ["1", "2", "3", "4", "5", "6"];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="blueprint absolute inset-0" />
      <div className="container-x absolute inset-x-0 top-24 hidden md:block">
        <div className="grid grid-cols-6 opacity-40">
          {cols.map((c) => (
            <span key={c} className="label border-l border-current/30 pl-2 text-[0.6rem]">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
