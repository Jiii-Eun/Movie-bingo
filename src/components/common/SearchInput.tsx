import Button from "@/components/common/Button";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput() {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="rounded-sm p-2 border-1 border-transparent bg-white/10 focus:outline-none focus:border-white"
        />
        <Button
          isIcon
          sx={{
            position: "absolute",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          className="right-0 top-1/2 -translate-y-1/2 p-2"
        >
          <SearchIcon />
        </Button>
      </div>
    </>
  );
}
