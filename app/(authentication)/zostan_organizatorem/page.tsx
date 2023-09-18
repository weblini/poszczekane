import SignupForm from "@/app/_components/SignupForm"
import Link from "next/link"

type Props = {}


export default function Page({ }: Props) {

    // FE or BE?

    // if already logged in but not organizer display different!

    return (
        <main className="hero min-h-[calc(100vh-4rem)] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl lg:gap-8">
                <div className="text-center lg:text-left">
                    <h1 className="sr-only">Zarejestruj się jako organizator</h1>
                    <p className="text-5xl font-bold">Zostań organizatorem!</p>
                    <p className="py-6">Dołącz jako organizator i twórz niesamowite wydarzenia dla miłośników psów i ich wiernych czworonogów. Przekonaj się jakie to proste!</p>
                    <Link href="/wspolpraca" className="link link-hover text-sm block">Zobacz dlaczego warto korzystać z serwisu jako organizator.</Link>
                    <Link href="/jak_dodac_wydarzenie" className="link link-hover text-sm block mt-2">Zobacz jak dodać wydarzenie.</Link>
                </div>
                <SignupForm />
            </div>
        </main>
    )
}