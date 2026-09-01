import Image from "next/image";

export const NetflixLogo = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/logos/logo-netflix.svg"
        alt="netflix"
        width={100}
        height={100}
        className={`${className ? className : "w-30 h-16"}`}
        loading="eager"
      />
    </>
  );
};

export const PrimeVideoLogo = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/logos/logo-prime-video.svg"
        alt="prime-video"
        width={100}
        height={100}
        className={`${className ? className : "w-30 h-16"}`}
        loading="eager"
      />
    </>
  );
};

export const DisneyPlusLogo = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/logos/logo-disney-plus.svg"
        alt="disney-plus"
        width={100}
        height={100}
        className={`bg-white rounded-full py-[0.25rem] ${className ? className : "w-16 h-16"}`}
        loading="eager"
      />
    </>
  );
};

export const AppleTVLogo = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/logos/logo-apple-tv.svg"
        alt="apple-tv"
        width={100}
        height={100}
        className={`invert ${className ? className : "w-20 h-16"}`}
        loading="eager"
      />
    </>
  );
};
