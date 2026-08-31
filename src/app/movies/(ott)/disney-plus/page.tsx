import OttLayout from "@/components/layouts/ott/OttLayout";
import Image from "next/image";

export default function DisneyPlusPage() {
  return (
    <>
      <OttLayout
        serviceType="disney"
        ottTitle={
          <Image
            src="/logos/logo-disney-plus.svg"
            alt="disney-plus"
            width={100}
            height={100}
            className="w-16 h-16 bg-white rounded-full py-[0.25rem]"
          />
        }
      />
    </>
  );
}
