import OttLayout from "@/components/layouts/ott/OttLayout";
import { NetflixLogo } from "@/components/common/OttLogo";

export default function NetflixPage() {
  return (
    <>
      <OttLayout serviceType="netflix" ottTitle={<NetflixLogo />} />
    </>
  );
}
