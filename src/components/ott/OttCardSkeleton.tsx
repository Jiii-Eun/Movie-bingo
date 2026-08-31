import Skeleton from "@/components/common/Skeleton";

export default function OttCardSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton
          key={index}
          className={`aspect-2/3 w-full rounded-xl ${
            index < 6 ? "" : index < 9 ? "hidden md:block" : "hidden lg:block"
          }`}
        />
      ))}
    </>
  );
}
