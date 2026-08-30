import FeedbackIcon from "@mui/icons-material/Feedback";

export default function NoList() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="px-2">
            <div
              className={`aspect-2/3 w-full rounded-xl bg-brand-gray-muted/50 ${
                i === 0 ? "" : i === 1 ? "hidden sm:block" : "hidden md:block"
              }`}
            ></div>
          </div>
        ))}
      </div>
      <FeedbackIcon
        className="animate-float absolute top-40 left-1/2 -translate-x-1/2 text-white"
        sx={{ fontSize: { xs: "2rem", md: "4rem" } }}
      />
      <p className="absolute top-60 left-1/2 -translate-x-1/2 flex items-center justify-center px-4 text-center text-sm text-white/70 md:text-base">
        이 서비스의 콘텐츠 목록이 없습니다.
      </p>
    </div>
  );
}
