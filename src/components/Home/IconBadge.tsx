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
  return (
    <div className="absolute top-2 left-2 ">
      {type === "netflix" && <NetflixBadge className="w-6 h-6 rounded-full" />}
      {type === "prime" && <PrimeVideoBadge className="w-6 h-6 rounded-full" />}
      {type === "disney" && (
        <DisneyPlusBadge className="w-6 h-6 rounded-full" />
      )}
      {type === "apple" && (
        <AppleTVBadge className="w-6 h-6 rounded-full bg-white" />
      )}
    </div>
  );
}
