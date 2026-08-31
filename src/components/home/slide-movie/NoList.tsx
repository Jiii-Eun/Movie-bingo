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
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4 sm:gap-4 md:gap-5">
        <FeedbackIcon
          className="animate-float text-white"
          sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}
        />
        <p className="max-w-[16rem] text-center text-sm font-bold text-white/70 sm:max-w-none sm:text-base md:text-xl">
          이 서비스의 콘텐츠 목록이 없습니다.
        </p>
      </div>
    </div>
  );
}
