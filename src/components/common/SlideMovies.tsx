import CardSkeleton from "@/components/home/slide-movie/CardSkeleton";
import NoList from "@/components/home/slide-movie/NoList";
import Carousel from "react-multi-carousel";
import { responsive } from "@/constans/responesive";
import "react-multi-carousel/lib/styles.css";

export default function SlideMovies({
  data,
  isPending,
  children,
  skeletonClass,
  skeletonContainerClass,
}: {
  data: unknown[];
  isPending: boolean;
  children: React.ReactNode;
  skeletonClass?: string;
  skeletonContainerClass?: string;
}) {
  return (
    <>
      {isPending ? (
        <CardSkeleton
          skeletonClass={skeletonClass}
          skeletonContainerClass={skeletonContainerClass}
        />
      ) : !data?.length ? (
        <NoList />
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          keyBoardControl
          swipeable
          draggable
          containerClass="overflow-visible py-4"
          itemClass="overflow-visible"
          sliderClass="overflow-visible"
        >
          {children}
        </Carousel>
      )}
    </>
  );
}
