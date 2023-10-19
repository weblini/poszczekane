import EventSearchBar from "../_components/EventSearchBar";
import MatchedEventsList from "./MatchedEventsList";
import HowToStart from "../_components/HowToStart";
import WhyJoin from "../_components/WhyJoin";
import BecomeOrganizer from "../_components/BecomeOrganizer";
import Loader from "../_components/Loader";
import Image from "next/image";
import heroImg from "../images/focus1.jpg";
import { metaTitle } from "../_utils/metadata";
import { Suspense } from "react";
import GeoEventsLoader from "./GeoEventsLoader";
import TagLinks from "../_components/TagLinks";

export const metadata = {
    title: metaTitle("Najlepsze wydarzenia dla miłośników psów"),
    description:
        "Odkrywaj nowe możliwości, ucz się, baw się i rozwijaj razem z nami. Zaplanuj niezapomniane chwile ze swoim psem, wybierając spośród imponującej listy wydarzeń, takich jak szkolenia, zawody, wystawy i wiele innych.",
};

export default function Index() {
    return (
        <main className="w-full">
            <div className="hero relative">
                <Image
                    alt=""
                    src={heroImg}
                    placeholder="blur"
                    quality={80}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-20 -z-10"
                />
                <div className="hero-content text-center">
                    <div className="max-w-xl py-10 lg:py-20">
                        <h1 className="text-4xl md:text-5xl font-extrabold pb-8 lg:pb-10">
                            Znajdź idealne wydarzenie dla Ciebie i Twojego psa!
                        </h1>
                        <EventSearchBar fieldId="home-search-form" />
                        <div className="flex flex-wrap justify-center gap-2 pt-4">
                            <Suspense fallback={<span className="badge animate-pulse"><span className="invisible">ładuję</span></span>}>
                                <TagLinks />
                            </Suspense>
                        </div>
                        <p className="hidden md:block pt-6 lg:pt-8 text-sm">
                            Jeśli jesteś pasjonatem psiego sportu, entuzjastą
                            wystaw psów, chcesz doskonalić umiejętności swojego
                            pupila lub po prostu szukasz fajnej imprezy{" "}
                            <span className="font-semibold block">
                                – mamy coś specjalnie dla Ciebie.
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 gap-y-12 px-[5vw] py-12 md:py-24">
                <section className="text-center flex flex-col">
                    <h2 className="title-base pb-2">Treningi i szkolenia</h2>
                    <p className="text-base-content/80">
                        Doskonal siebie i swojego psa pod okiem ekspertów.
                        Zapisz się na trening lub szkolenie, które pomoże Wam
                        odkryć nowe umiejętności.
                    </p>

                    <div className="pt-8 flex flex-col gap-2 text-left">
                        <Suspense fallback={<Loader />}>
                            <MatchedEventsList
                                matchedTags={["szkolenie", "trening"]}
                            />
                        </Suspense>
                    </div>
                </section>
                <section className="text-center flex flex-col">
                    <h2 className="title-base pb-2">Zawody</h2>
                    <p className="text-base-content/80">
                        Pokaż, jak zgrani jesteście ze swoim psem. Sprawdź
                        nadchodzące zawody i zgłoś Was na emocjonującą
                        rywalizację.
                    </p>

                    <div className="pt-8 flex flex-col gap-2 text-left">
                        <Suspense fallback={<Loader />}>
                            <MatchedEventsList matchedTags={["zawody"]} />
                        </Suspense>
                    </div>
                </section>
                <section className="text-center flex flex-col">
                    <h2 className="title-base pb-2">Wystawy</h2>
                    <p className="text-base-content/80">
                        Czy Twój pies ma to "coś", by zabłysnąć na ringu?
                        Dowiedz się, gdzie i kiedy odbędą się nadchodzące
                        wystawy.
                    </p>

                    <div className="pt-8 flex flex-col gap-2 text-left">
                        <Suspense fallback={<Loader />}>
                            <MatchedEventsList matchedTags={["wystawa"]} />
                        </Suspense>
                    </div>
                </section>
            </div>

            <section className="py-12 md:py-24 bg-base-300/20">
                <div className="px-[5vw] text-center lg:text-left pb-4 lg:pb-8">
                    <h2 className="title-ghost">
                        Mapa{" "}
                        <span className="hidden lg:inline">nadchodzących </span>
                        wydarzeń
                    </h2>
                    <p>
                        Odkryj wydarzenia w swojej okolicy na interaktywnej
                        mapie. Nie przegap szansy na wspaniałą przygodę z Twoim
                        psem!
                    </p>
                </div>
                <div className="lg:px-[5vw]">
                    <Suspense fallback={<Loader />}>
                        <GeoEventsLoader />
                    </Suspense>
                </div>
            </section>

            <HowToStart />

            <WhyJoin />

            <BecomeOrganizer />
        </main>
    );
}
