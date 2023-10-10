import Link from "next/link";
import Image from "next/image";
import bgImg from "@/app/images/sniffing1.jpg";

type Props = {};

// component for default 404 and poszczekane/* 404's

export default function BaseNotFound({}: Props) {
    return (
        <main className="hero min-h-[calc(100vh-4rem)] relative w-full">
            <Image
                alt=""
                src={bgImg}
                placeholder="blur"
                quality={80}
                fill
                sizes="100vw"
                className="object-cover -z-10"
            />
            <div className="hero-content flex-col lg:flex-row px-[5vw] py-12 gap-8">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-base-100">
                        Przepraszamy, nie udało się odnaleźć strony, której
                        szukasz.
                    </h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body text-center gap-6">
                        <h2 className="font-extrabold text-xl">
                            Co możesz teraz zrobić:
                        </h2>
                        <div className="flex flex-col w-full">
                            <p>
                                Upewnij się, że wprowadziłeś poprawny adres
                                strony w pasku adresowym przeglądarki.
                            </p>
                            <div className="divider">lub</div>
                            <div>
                                <p className="pb-4">
                                    Wróć na stronę główną i kontynuuj
                                    przeglądanie.
                                </p>
                                <Link href="/" className="btn btn-primary w-full">
                                    Strona główna
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm">
                            Dziękujemy za cierpliwość i wyrozumiałość.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
