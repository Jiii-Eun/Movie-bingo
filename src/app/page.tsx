import Banner from "@/components/Home/Banner";
import TopMovies from "@/components/Home/TopMovies";

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
          title="Top Movies"
          badges={["netflix", "prime", "disney", "apple"]}
        />
      </div>
    </>
  );
}
