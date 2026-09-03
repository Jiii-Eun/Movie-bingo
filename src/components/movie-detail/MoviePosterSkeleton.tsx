import Skeleton from "@/components/common/Skeleton";

export default function MoviePosterSkeleton() {
  return (
    <section className="relative overflow-hidden">
      <Skeleton className="absolute inset-0 h-full w-full opacity-25" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/30" />

      <div className="relative flex-center px-4 py-8 md:py-14">
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-end md:gap-12">
          <div className="flex-center w-full shrink-0 max-w-[47rem] md:max-w-[20rem]">
            <Skeleton className="aspect-2/3 h-auto w-full max-w-full rounded-2xl md:max-w-[20rem]" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-5 pb-1">
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-2 h-10 w-3/4 md:h-12" />
              <Skeleton className="mt-3 h-4 w-56 md:w-72" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-7 w-14 rounded-md" />
              <Skeleton className="h-8 w-14 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-14 rounded-full" />
            </div>

            <div className="flex items-center gap-4">
              <div>
                <Skeleton className="h-3 w-8" />
                <Skeleton className="mt-1 h-5 w-36" />
              </div>
              <div>
                <Skeleton className="h-3 w-8" />
                <Skeleton className="mt-1 h-5 w-48" />
              </div>
            </div>

            <div>
              <Skeleton className="mb-2 h-5 w-14" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-11/12" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>

            <div className="flex w-full flex-col gap-2 md:flex-row md:flex-wrap">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-12 w-full rounded-md md:w-40"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
