import OttLayout from "@/components/layouts/ott/OttLayout";
import Image from "next/image";

export default function AppleTVPage() {
  return (
    <>
      <OttLayout
        serviceType="apple"
        ottTitle={
          <Image
            src="/logos/logo-apple-tv.svg"
            alt="apple-tv"
            width={100}
            height={100}
            className="w-20 h-16 invert"
          />
        }
      />
    </>
  );
}
