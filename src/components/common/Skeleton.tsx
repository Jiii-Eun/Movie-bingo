export default function Skeleton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`animate-pulse bg-brand-gray-muted ${className}`}>
      {children}
    </div>
  );
}
