import OttLayout from "@/components/layouts/ott/OttLayout";
import { PrimeVideoLogo } from "@/components/common/OttLogo";

export default function PrimeVideoPage() {
  return (
    <>
      <OttLayout serviceType="prime" ottTitle={<PrimeVideoLogo />} />
    </>
  );
}
