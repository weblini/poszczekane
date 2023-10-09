import SignupForm from "@/app/_components/SignupForm"
import Link from "next/link"

type Props = {}


export default function Page({ }: Props) {

    // FE or BE?

    // what about organizers? maybe extract the signup form?

    return (
        <main className="hero min-h-[calc(100vh-4rem)] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl lg:gap-8">
                <div className="text-center lg:text-left">
                    <h1 className="sr-only">Stwórz nowe konto</h1>
                    <p className="text-5xl font-bold">Gotowi na przygodę?</p>
                    <p className="py-6">Zarejestruj się i zacznij planować Wasze wspólne przygody. Twój pies już nie może się doczekać nowych wyzwań i pasjonujących wydarzeń!</p>
                    <Link href="/jak_to_dziala" className="link link-hover text-sm font-semibold py-1">Zobacz dlaczego warto do nas dołączyć.</Link>
                </div>
                <SignupForm />
            </div>
        </main>
    )
}