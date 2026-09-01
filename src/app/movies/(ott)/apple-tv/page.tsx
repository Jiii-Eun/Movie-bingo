import OttLayout from "@/components/layouts/ott/OttLayout";
import { AppleTVLogo } from "@/components/common/OttLogo";

export default function AppleTVPage() {
  return (
    <>
      <OttLayout serviceType="apple" ottTitle={<AppleTVLogo />} />
    </>
  );
}
