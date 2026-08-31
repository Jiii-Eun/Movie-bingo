import {
  NetflixBadge,
  PrimeVideoBadge,
  DisneyPlusBadge,
  AppleTVBadge,
} from "@/components/common/OttBadge";
import { StreamingAvailabilityCatalog } from "@/type/apiType";

export default function IconBadge({
  type,
}: {
  type: StreamingAvailabilityCatalog;
}) {
  const badgeStyle = "w-6 h-6 rounded-full bg-white";

  return (
    <div className="absolute top-2 left-2 ">
      {type === "netflix" && <NetflixBadge className={badgeStyle} />}
      {type === "prime" && <PrimeVideoBadge className={badgeStyle} />}
      {type === "disney" && <DisneyPlusBadge className={badgeStyle} />}
      {type === "apple" && <AppleTVBadge className={badgeStyle} />}
    </div>
  );
}
