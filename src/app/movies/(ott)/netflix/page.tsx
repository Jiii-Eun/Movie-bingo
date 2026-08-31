import Image from "next/image";
import OttLayout from "@/components/layouts/ott/OttLayout";

export default function NetflixPage() {
  return (
    <>
      <OttLayout
        serviceType="netflix"
        ottTitle={
          <Image
            src="/logos/logo-netflix.svg"
            alt="netflix"
            width={100}
            height={100}
            className="w-30 h-16"
          />
        }
      />
    </>
  );
}
