import Banner from "@/components/home/banner/Banner";
import TopMovies from "@/components/home/slide-movie/TopMovies";
import UpdateMovies from "@/components/home/slide-movie/UpdateMovies";
import { ottTypes } from "@/constans/ott";
import { StreamingAvailabilityCatalog } from "@/type/apiType";

// 레이아웃 - 검색
// 메인 페이지 - 추천, 종료일, 공개일 / 각각 filter nav - 넷플릭스, 프라임 비디오, 디즈니, 애플 티비 등
// 상세 페이지
// 유저 페이지
// 검색 페이지
// 넷플릭스 전체 페이지
// 프라임 비디오 전체 페이지
// 디즈니 전체 페이지
// 애플 티비 전체 페이지

export default function Home() {
  return (
    <>
      <div>
        <Banner />
        <TopMovies
          title="Top 10 영화"
          badges={Object.values(ottTypes) as StreamingAvailabilityCatalog[]}
        />
        <UpdateMovies />
      </div>
    </>
  );
}
