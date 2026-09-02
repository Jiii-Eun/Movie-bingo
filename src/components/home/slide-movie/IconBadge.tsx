import {
  NetflixBadge,
  PrimeVideoBadge,
  DisneyPlusBadge,
  AppleTVBadge,
} from "@/components/common/OttBadge";
import { StreamingAvailabilityCatalog } from "@/type/apiType";
import { Netflix, PrimeVideo, DisneyPlus, AppleTV } from "@/constans/ott";

export default function IconBadge({
  type,
}: {
  type: StreamingAvailabilityCatalog;
}) {
  const badgeStyle = "w-6 h-6 rounded-full bg-white";

  return (
    <div className="absolute top-2 left-2 ">
      {type === Netflix && <NetflixBadge className={badgeStyle} />}
      {type === PrimeVideo && <PrimeVideoBadge className={badgeStyle} />}
      {type === DisneyPlus && <DisneyPlusBadge className={badgeStyle} />}
      {type === AppleTV && <AppleTVBadge className={badgeStyle} />}
    </div>
  );
}
