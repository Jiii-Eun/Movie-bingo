import { StreamingAvailabilityCatalog } from "@/type/apiType";
import Image from "next/image";
import { Netflix, PrimeVideo, DisneyPlus, AppleTV } from "@/constans/ott";

export const CATALOG_LABELS = {
  netflix: "Netflix",
  prime: "Prime Video",
  disney: "Disney+",
  apple: "Apple TV",
} as const satisfies Record<StreamingAvailabilityCatalog, string>;

export const OttBadge = ({
  type,
  isActive,
  onSelect,
  className,
}: {
  type: StreamingAvailabilityCatalog;
  isActive: boolean;
  className?: string;
  onSelect: (type: StreamingAvailabilityCatalog) => void;
}) => {
  return (
    <>
      <div
        className={`flex-center border rounded-full border-white/10 gap-1 text-white px-2 py-1 cursor-pointer ${className} ${
          isActive ? "bg-brand-red-muted" : ""
        }`}
        onClick={() => onSelect(type)}
      >
        <div className="rounded-full overflow-hidden bg-white flex-center">
          {type === Netflix && <NetflixBadgeRound />}
          {type === PrimeVideo && <PrimeVideoBadgeRound />}
          {type === DisneyPlus && <DisneyPlusBadgeRound />}
          {type === AppleTV && <AppleTVBadgeRound />}
        </div>
        <span className="text-xs flex-center">{CATALOG_LABELS[type]}</span>
      </div>
    </>
  );
};

export const NetflixBadge = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/icons/icon-netflix.png"
        alt="Netflix"
        width={16}
        height={16}
        className={className}
      />
    </>
  );
};

export const PrimeVideoBadge = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/icons/icon-prime-video.svg"
        alt="Prime Video"
        width={16}
        height={16}
        className={className}
      />
    </>
  );
};

export const DisneyPlusBadge = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/icons/icon-disney-plus.png"
        alt="Disney+"
        width={16}
        height={16}
        className={className}
      />
    </>
  );
};

export const AppleTVBadge = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        src="/icons/icon-apple-tv.png"
        alt="Apple TV"
        width={16}
        height={16}
        className={`h-4 w-4 object-contain ${className}`}
      />
    </>
  );
};

const badgeStyle = "w-6 h-6 rounded-full bg-white";

export const NetflixBadgeRound = () => {
  return (
    <>
      <NetflixBadge className={badgeStyle} />
    </>
  );
};

export const PrimeVideoBadgeRound = () => {
  return (
    <>
      <PrimeVideoBadge className={badgeStyle} />
    </>
  );
};

export const DisneyPlusBadgeRound = () => {
  return (
    <>
      <DisneyPlusBadge className={badgeStyle} />
    </>
  );
};

export const AppleTVBadgeRound = () => {
  return (
    <>
      <AppleTVBadge className={badgeStyle} />
    </>
  );
};
