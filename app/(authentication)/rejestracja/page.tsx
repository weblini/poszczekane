import SignupForm from "@/app/_components/SignupForm"
import Link from "next/link"
import Image from "next/image";
import bgImg from "@/app/images/register1.jpg";


export default function Page() {

    return (
        <main className="hero min-h-[calc(100vh-4rem)] relative">
            <Image
                alt=""
                src={bgImg}
                placeholder="blur"
                quality={80}
                fill
                sizes="100vw"
                className="object-cover opacity-25 -z-10 object-top"
            />
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl gap-6 md:gap-12">
                <div className="text-center lg:text-left">
                    <p className="text-5xl font-bold">Gotowi na przygodę?</p>
                    <h1 className="py-4 md:py-6">Zarejestruj się i zacznij planować Wasze wspólne przygody.</h1>
                    <Link href="/jak_to_dziala" className="link link-hover text-sm font-semibold py-1">Zobacz dlaczego warto do nas dołączyć!</Link>
                </div>
                <SignupForm />
            </div>
        </main>
    )
}