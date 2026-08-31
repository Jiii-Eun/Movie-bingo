import SearchInput from "@/components/common/SearchInput";

import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";

export default function Header() {
  const isLoggedIn = false;

  return (
    <header>
      <div className="flex-between ">
        <h1 className="text-2xl font-semibold">
          <Logo />
        </h1>
        <div className="flex-center gap-4">
          <SearchInput />
          <div>
            <Button
              isIcon
              sx={{ borderRadius: "0.2rem" }}
              className="flex-center flex-col"
            >
              {isLoggedIn ? (
                <>
                  <LogoutIcon />
                  <span className="text-sm md:block hidden">로그아웃</span>
                </>
              ) : (
                <>
                  <LoginIcon />
                  <span className="text-sm md:block hidden">로그인</span>
                </>
              )}
            </Button>
          </div>
          <div className="md:hidden">
            <Button isIcon>
              <MenuIcon />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
