import Skeleton from "@/components/common/Skeleton";

export default function CardSkeleton({
  skeletonClass,
  skeletonContainerClass,
}: {
  skeletonClass?: string;
  skeletonContainerClass?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ${skeletonContainerClass}`}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="px-2">
          <Skeleton
            className={`aspect-2/3 w-full rounded-xl ${
              i === 0 ? "" : i === 1 ? "hidden sm:block" : "hidden md:block"
            } ${skeletonClass}`}
          />
        </div>
      ))}
    </div>
  );
}
