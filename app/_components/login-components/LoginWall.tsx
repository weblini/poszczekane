import Link from "next/link";
import Image from "next/image";
import bgImg from "@/app/images/hello1.jpg";
import LoginForm from "./LoginForm";

export default function LoginWall() {
    return (
        <main className="hero min-h-[calc(100vh-4rem)] relative">
            <Image
                alt=""
                src={bgImg}
                placeholder="blur"
                quality={80}
                fill
                sizes="100vw"
                className="object-cover opacity-25 -z-10"
            />
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl gap-6 md:gap-12">
                <div className="text-center lg:text-left">
                    <p className="text-4xl md:text-5xl font-bold">
                        Miło Cię widzieć!
                    </p>
                    <h1 className="py-4 md:py-6">Zaloguj się</h1>
                    <p className="text-sm">
                        Lub{" "}
                        <Link
                            className="link link-hover font-semibold"
                            href="/rejestracja"
                        >
                            załóż konto
                        </Link>
                        , aby cieszyć się spersonalizowanymi treściami,
                        zarządzać swoim kalendarzem i przeglądać zapisane
                        wydarzenia.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <LoginForm className="card-body"/>
                </div>
            </div>
        </main>
    );
}
