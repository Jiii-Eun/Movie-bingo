import OttLayout from "@/components/layouts/ott/OttLayout";
import { NetflixLogo } from "@/components/common/OttLogo";
import { Netflix } from "@/constans/ott";

export default function NetflixPage() {
  return (
    <>
      <OttLayout serviceType={Netflix} ottTitle={<NetflixLogo />} />
    </>
  );
}
