import OttLayout from "@/components/layouts/ott/OttLayout";
import { DisneyPlusLogo } from "@/components/common/OttLogo";

export default function DisneyPlusPage() {
  return (
    <>
      <OttLayout serviceType="disney" ottTitle={<DisneyPlusLogo />} />
    </>
  );
}
