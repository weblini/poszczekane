"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Image from "next/image";
import bgImg from "./images/join1.jpg";
import Link from "next/link";

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
        <div className="hero min-h-[calc(100vh-4rem)] relative w-full">
            <Image
                alt=""
                src={bgImg}
                placeholder="blur"
                quality={80}
                fill
                sizes="100vw"
                className="object-cover opacity-20 -z-10"
            />
            <div className="hero-content flex-col lg:flex-row px-[5vw] py-12 gap-2">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-extrabold">
                        Ups: Coś poszło nie tak
                    </h1>
                    <p className="py-6">
                        Przepraszamy za utrudnienia. Wygląda na to, że wystąpił
                        problem podczas przetwarzania Twojej prośby. Nie martw
                        się, jesteśmy tu, aby pomóc!
                    </p>
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className="btn btn-primary"
                    >
                        Spróbuj ponownie
                    </button>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body text-center">
                        <p className="text-sm py-2">
                            Jeśli problem będzie się powtarzał, skontaktuj się z
                            nami, używając <Link href='/formularz' className="link link-hover font-semibold">formularza kontaktowego</Link> lub <Link href='/kontakt' className="link link-hover font-semibold">informacji</Link> dostępnych na naszej stronie.
                        </p>
                        <p>Dziękujemy za cierpliwość i wyrozumiałość.</p>
                    </div>
                </div>
            </div>
        </div>
    );

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
            <h2 className="text-4xl md:text-5xl font-extrabold">
                Coś poszło nie tak
            </h2>
            <p className="py-4">
                Przepraszamy za utrudnienia. Wygląda na to, że wystąpił problem
                podczas przetwarzania Twojej prośby. Nie martw się, jesteśmy tu,
                aby pomóc!
            </p>
        </div>
    );
}
