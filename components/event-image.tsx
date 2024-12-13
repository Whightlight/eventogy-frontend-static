"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import Image from "next/image";
export default function EventImage({ alt, url }: { alt: string; url: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <Image
        alt={alt}
        src={url}
        fill
        onLoad={() => setIsLoading(false)}
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
    </div>
  );
}
