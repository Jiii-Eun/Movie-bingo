export default function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`text-sm font-medium text-white rounded-full border border-white/10 px-3 py-1.5 ${className}`}
    >
      {children}
    </div>
  );
}
