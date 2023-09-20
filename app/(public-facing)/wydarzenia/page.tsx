import EventCard from "@/app/_components/EventCard";
import EventSearchBar from "@/app/_components/EventSearchBar";
import { metaTitle } from "@/app/_utils/metadata";
import Image from "next/image";
import searchImg from "@/app/images/search1.jpg";
import { supabaseAnon } from "@/app/_utils/supabase-clients";
import FilterEventsView from "./FilterEventsView";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {
    searchParams: { tag?: SearchParam };
};

type SearchParam = string | string[];

export const metadata = {
    title: metaTitle("Wydarzenia"),
    desciption:
        "Wybieraj spośród setek wydarzeń i twórz niezapomniane chwile z Twoim pupilem. Niezależnie od tego, czy jesteś doświadczonym właścicielem psa czy dopiero zaczynasz swoją przygodę, nasza platforma ma coś dla każdego.",
};

export default async function Page({ searchParams }: Props) {
    // get available tags
    const { data: tags } = await supabaseAnon.from("tags").select();

    const supabase = createServerComponentClient<Database>({ cookies });

    // base query, grab all events without filters
    let supaQuery = supabase
        .from("events")
        .select(
            "name, starts_at, ends_at, id, organizers( name, slug ), tags( name ), filter_tags:tags!inner(name)"
        );

    // filter by tags if provided
    if (searchParams.tag) {
        const tagArray = Array.isArray(searchParams.tag)
            ? searchParams.tag
            : [searchParams.tag];

        supaQuery = supaQuery.in("filter_tags.name", tagArray);
    }

    const { data: events, error } = await supaQuery;

    return (
        <>
            <main className="w-full">
                <FilterEventsView allTags={tags} />
                <div className="wrapper pt-0">
                    <h1 className="font-black text-base-content/30 text-xl md:text-3xl">Nadchodzące wydarzenia</h1>
                    <p>
                        Przeglądaj wydarzenia, zapisuj się i ciesz się
                        wyjątkowym czasem spędzonym ze swoim wiernym
                        towarzyszem!
                    </p>
                    {events?.length ? (
                        <ol className="grid lg:grid-cols-3 gap-4 pt-6">
                            {events.map((event) => (
                                <li key={event.id}>
                                    <EventCard event={event} />
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>
                            <span>Bardzo nam przykro,</span> ale wygląda na to,
                            że nie ma wydarzeń spełniających Twoje kryteria.
                        </p>
                    )}
                </div>
            </main>

            <div className="wrapper w-full text-center relative">
                <Image
                    alt=""
                    src={searchImg}
                    placeholder="blur"
                    quality={80}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-20 -z-10"
                />
                <h2>Nie możesz znaleźć tego, czego szukasz?</h2>
                <p className="font-black text-xl md:text-3xl pb-4">
                    Spróbuj wyszukać wydarzenie po nazwie
                </p>
                <div className="max-w-xl mx-auto">
                    <EventSearchBar fieldId="last-chance-search" />
                </div>
            </div>
        </>
    );
}
