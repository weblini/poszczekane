"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Image from "next/image";
import bgImg from "./images/join1.jpg";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-[5vw] py-12 relative w-full">
      <Image
        alt=""
        src={bgImg}
        placeholder="blur"
        quality={80}
        fill
        sizes="100vw"
        className="object-cover opacity-20 -z-10"
      />
      <h2 className="text-6xl md:text-7xl font-extrabold">O nie!</h2>
      <p className="md:text-lg py-4">
        Bardzo nam przykro, ale coś poszło nie tak.
      </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="btn btn-primary"
      >
        Spróbuj jeszcze raz
      </button>
    </div>
  );
}
