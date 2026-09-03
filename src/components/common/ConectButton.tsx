import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function ConectButton({
  optionLink,
  imdbId,
}: {
  optionLink: string;
  imdbId: string;
}) {
  const linkStyle = "flex items-center rounded-md text-lg py-2 px-4";

  return (
    <>
      <Link
        href={optionLink}
        target="_blank"
        className={`${linkStyle} gap-2 bg-white text-brand-black hover:bg-brand-red hover:text-white items-center align-middle group/link`}
      >
        <div className="play text-brand-black group-hover/link:text-white" />
        <div className="text-brand-black group-hover/link:text-white hidden md:block">
          바로가기
        </div>
      </Link>
      <Link
        href={`/movies/${imdbId}`}
        className={`${linkStyle} bg-brand-red hover:bg-brand-red-hover align-middle`}
      >
        {/* 스타일 확인해야함 */}
        <div className="block md:hidden">
          <AddIcon
            sx={{ color: "white", fontSize: "1.5rem", overflow: "hidden" }}
          />
        </div>
        <div className="text-white hidden md:block">상세 정보</div>
      </Link>
    </>
  );
}
