import EventCardDisplay from "@/app/_components/EventCardDisplay";
import EventSearchBar from "@/app/_components/EventSearchBar";
import InfoDiv from "@/app/_components/InfoDiv";
import InfoText from "@/app/_components/InfoText";
import TagLinks from "@/app/_components/TagLinks";
import UpcomingEvents from "@/app/_components/UpcomingEvents";
import { metaTitle } from "@/app/_utils/metadata";
import { createClient } from "@/app/_utils/supabase/server";
import Link from "next/link";

type Props = {
    searchParams: Promise<{ q?: string }>;
};

export const metadata = {
    title: metaTitle("Wyszukiwarka wydarzeń"),
    description:
        "Wprowadź interesujące Cię słowo kluczowe i znajdź idealne wydarzenie dla siebie i swojego pupila. Nasza strona umożliwia Ci błyskawiczne dostosowanie wyników, dzięki czemu znajdziesz dokładnie to, czego szukasz.",
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    // show only searchbar if no query string
    if (!searchParams.q) {
        return (
            <main className="wrapper w-full flex flex-col items-center grow min-h-[50vh] justify-center">
                <h1 className="title-base">Wyszukaj wydarzenie</h1>
                <InfoText>
                    Wpisz czego szukasz, aby znaleźć interesujące cię
                    wydarzenie.
                </InfoText>
                <div className="w-full max-w-xl py-4">
                    <EventSearchBar fieldId="search-page-search" />
                </div>
            </main>
        );
    }

    // grab search query and perform textSearch with supabase
    const supabase = await createClient();

    const { data: matchingEvents, error } = await supabase
        .from("events")
        .select(
            "id, name, starts_at, ends_at, location, tags ( name ), organizers ( name )"
        )
        .textSearch("name", `${searchParams.q}`, {
            type: "websearch",
        });

    if (error) {
        throw error;
    }

    return (
        <>
            <main className="w-full bg-base-300/20">
                <div className="px-[5vw] py-6 rounded-b-box shadow bg-base-100">
                    <h2 className="pb-2">Wyszukaj wydarzenie</h2>
                    <InfoText>
                        Wpisz czego szukasz, aby znaleźć interesujące cię
                        wydarzenie.
                    </InfoText>
                    <div className="w-full max-w-xl pt-4">
                        <EventSearchBar fieldId="search-page-search" />
                    </div>
                </div>

                <div className="wrapper pt-6 lg:pt-12">
                    <h1 className="font-extrabold text-base-content/30 text-xl md:text-3xl pb-4 lg:pb-6">
                        Wydarzenia dla wyszukiwania "{searchParams.q}"
                    </h1>
                    {!!matchingEvents?.length && (
                        <EventCardDisplay events={matchingEvents} />
                    )}
                    {matchingEvents?.length ? (
                        <InfoText className="pt-4">
                            Nie widzisz interesującego Cię wydarzenia? Spróbuj
                            ponownie lub{" "}
                            <Link
                                href="/wydarzenia"
                                className="link link-hover font-semibold"
                            >
                                przejdź do katalogu dostepnych wydarzeń
                            </Link>
                            .
                        </InfoText>
                    ) : (
                        <InfoDiv>
                            <p>
                                Niestety, nie znaleźliśmy żadnych wydarzeń
                                pasujących do Twojego zapytania. Spróbuj
                                ponownie lub przejdź do strony z nadchodzącymi
                                wydarzeniami
                            </p>
                            <Link
                                href="/wydarzenia"
                                className="btn btn-neutral"
                            >
                                Przeglądaj dostępne wydarzenia
                            </Link>
                        </InfoDiv>
                    )}
                </div>
            </main>
            <div className="wrapper w-full">
                <section className="pb-12">
                    <h2 className="title-base pb-2">Dostępne kategorie wydarzeń</h2>
                    <InfoText>
                        Wybierz interesującą Cię kategorię, aby zobaczyć
                        nadchodzące wydarzenia tego typu
                    </InfoText>
                    <div className="flex flex-wrap gap-2 pt-4">
                        <TagLinks withBorders />
                    </div>
                </section>
                <section>
                    <h2 className="title-base pb-4 lg:pb-6">
                        Nadchodzące wydarzenia, które mogą Cię zainteresować:
                    </h2>
                    <div>
                        <UpcomingEvents />
                    </div>
                </section>
            </div>
        </>
    );
}
