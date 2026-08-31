import OttLayout from "@/components/layouts/ott/OttLayout";
import Image from "next/image";

export default function PrimeVideoPage() {
  return (
    <>
      <OttLayout
        serviceType="prime"
        ottTitle={
          <Image
            src="/logos/logo-prime-video.svg"
            alt="prime-video"
            width={100}
            height={100}
            className="w-30 h-16"
          />
        }
      />
    </>
  );
}
