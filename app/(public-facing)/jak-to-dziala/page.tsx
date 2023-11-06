import { metaTitle } from "app/_utils/metadata";
import Link from "next/link";
import UpcomingEvents from "app/_components/UpcomingEvents";
import { Suspense } from "react";
import Loader from "app/_components/Loader";
import Image from "next/image";
import bgImg from "app/images/letsgo1.jpg";


export const metadata = {
    title: metaTitle("Jak korzystać z serwisu"),
    description:
        "Dowiedz się, jak prosto i przyjemnie korzystać z naszej platformy. Odkryj kroki, które pozwolą Ci zapisać się na wydarzenia dla miłośników psów. Zacznij swoją przygodę z nami już teraz!",
};

export default function Page() {
    return (
        <>
            <main className="w-full px-[5vw] py-12 lg:py-24 max-md:text-center max-w-6xl">
                <h1 className="text-4xl md:text-5xl font-extrabold">
                    Jak korzystać z serwisu
                </h1>
                <p className="pt-6 lg:pt-10 md:text-lg">
                    Witaj w przewodniku po platformie Poszczekane! Dowiedz się,
                    jak przeglądać dostępne wydarzenia, zapisywać się na nie i
                    sprawnie zarządzać swoim kalendarzem, by czerpać pełnię
                    szczęścia z wyjatkowych chwil spędzonych z Twoim pupilem.
                </p>
                <ol className="grid gap-12 lg:gap-20 py-16 [counter-reset:krok]">
                    <li className="[counter-increment:krok] before:content-[counter(krok)] before:font-extrabold before:text-primary before:text-6xl lg:pl-16 lg:relative lg:before:absolute lg:before:left-0 lg:begore:top-0">
                        <h2 className="title-base pb-2 text-primary-focus">
                            Znajdź wymarzone wydarzenie
                        </h2>
                        <p>
                            Rozpocznij swoją przygodę, przeglądając dostępne
                            wydarzenia. W naszej bogatej ofercie znajdziesz
                            szkolenia, zawody, wystawy i wiele innych
                            fascynujących opcji. Odkrywaj, eksploruj i wybieraj
                            te, które Cię najbardziej interesują, korzystając z{" "}
                            <Link
                                href="/wydarzenia"
                                className="link link-hover font-semibold"
                            >
                                wyszukiwarki oraz filtrów
                            </Link>
                            .
                        </p>
                    </li>
                    <li className="[counter-increment:krok] before:content-[counter(krok)] before:font-extrabold before:text-primary before:text-6xl lg:pl-16 lg:relative lg:before:absolute lg:before:left-0 lg:begore:top-0 lg:ml-6">
                        <h2 className="title-base pb-2 text-primary-focus">Zapisz się</h2>
                        <p>
                            Widzisz wydarzenie, które Cię zainteresuje? To
                            świetnie! Kliknij "Zapisz się" i postępuj zgodnie z
                            instrukcjami. Na stronie wydarzenia znajdziesz
                            wszystkie kluczowe informacje na jego temat, takie
                            jak termin, lokalizacja oraz koszt uczestnictwa.
                        </p>
                    </li>
                    <li className="[counter-increment:krok] before:content-[counter(krok)] before:font-extrabold before:text-primary before:text-6xl lg:pl-16 lg:relative lg:before:absolute lg:before:left-0 lg:begore:top-0">
                        <h2 className="title-base pb-2 text-primary-focus">
                            Zarządzaj swoim kalendarzem
                        </h2>
                        <p>
                            Każde wydarzenie, na które się zapiszesz,
                            automatycznie pojawi się w{" "}
                            <Link
                                href="/kalendarz"
                                className="link link-hover font-semibold"
                            >
                                Twoim kalendarzu
                            </Link>
                            . To w nim możesz z łatwością śledzić wszystkie
                            zaplanowane udziały, dotyczące ich szczegóły oraz
                            aktualizacje przesyłane przez organizatorów.
                        </p>
                    </li>
                    <li className="[counter-increment:krok] before:content-[counter(krok)] before:font-extrabold before:text-primary before:text-6xl lg:pl-16 lg:relative lg:before:absolute lg:before:left-0 lg:before:top-0 lg:ml-6">
                        <h2 className="title-base pb-2 text-primary-focus">
                            Rozwijaj się i realizuj pasje
                        </h2>
                        <p>
                            Nadeszła wyczekiwana chwila! Przyjdź na miejsce
                            wydarzenia razem ze swoim pupilem. To czas na
                            realizowanie swoich pasji, poznawanie nowych
                            przyjaciół i czerpanie radości z Waszej relacji.
                            Bawcie się dobrze!
                        </p>
                    </li>
                </ol>
            </main>

            <section className="w-full py-12 lg:py-24 px-[5vw] relative text-center">
                <Image
                    alt=""
                    src={bgImg}
                    placeholder="blur"
                    quality={80}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-20 -z-10 object-top"
                />
                <p className="text-sm text-base-content/80 max-md:hidden">
                    Teraz, gdy znasz już podstawy korzystania z naszej
                    platformy, czas zaplanować Waszą następną przygodę! Nie
                    przegap okazji do udziału w niezapomnianych wydarzeniach z
                    Twoim psem.
                </p>
                <h2 className="font-extrabold text-xl md:text-3xl">
                    Gotowi na wspólną przygodę?
                </h2>
                <p className="text-base-content/80 pt-2">
                    Oto kilka nadchodzących wydarzeń, które mogą Cię
                    zainteresować:
                </p>
                <div className="grid md:grid-cols-3 py-6">
                    <Suspense fallback={<Loader />}>
                        <UpcomingEvents />
                    </Suspense>
                </div>
                <Link href="/wydarzenia" className="btn w-full sm:max-w-xs">
                    Wszystkie wydarzenia
                </Link>
            </section>
        </>
    );
}
