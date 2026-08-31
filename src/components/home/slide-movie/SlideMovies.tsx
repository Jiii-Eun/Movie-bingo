import { Show } from "streaming-availability";
import CardSkeleton from "@/components/home/slide-movie/CardSkeleton";
import NoList from "@/components/home/slide-movie/NoList";
import Carousel from "react-multi-carousel";
import { responsive } from "@/constans/responesive";

export default function SlideMovies({
  data,
  isPending,
  children,
}: {
  data: Show[];
  isPending: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isPending ? (
        <CardSkeleton />
      ) : !data?.length ? (
        <NoList />
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          keyBoardControl
          swipeable
          draggable
          containerClass="overflow-visible"
        >
          {children}
        </Carousel>
      )}
    </>
  );
}
