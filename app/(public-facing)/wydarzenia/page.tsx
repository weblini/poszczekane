import EventCard from "@/app/_components/EventCard";
import EventSearchBar from "@/app/_components/EventSearchBar";
import { metaTitle } from "@/app/_utils/metadata";
import Image from "next/image";
import searchImg from "@/app/images/search1.jpg";
import InputField from "@/app/_components/InputField";
import { supabaseAnon } from "@/app/_utils/supabase-clients";

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
    // ! make this a client component for better UX?

    // get available tags
    const { data: tags } = await supabaseAnon.from("tags").select();

    // base query, grab all events without filters
    let supaQuery = supabaseAnon
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
                <div className="px-[5vw] py-6">
                    <div>
                        <p className="text-error">
                            Make this a fixed round button at the bottom left
                            corner on mobile
                        </p>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Wybierz tagi</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {tags?.map((tag) => (
                                    <input
                                        key={tag.id}
                                        type="checkbox"
                                        name="tag"
                                        value={tag.name}
                                        aria-label={tag.name}
                                        className="btn font-normal rounded-full h-6 min-h-6"
                                    />
                                ))}
                            </div>
                        </div>

                        <InputField label="Wojewódźtwo" name="wojewodship" />
                        <InputField
                            label="Najwcześniejsza data rozpoczęcia"
                            name="start_date"
                            type="date"
                        />

                        <button className="btn btn-secondary">
                            <svg
                                height="24px"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                            Pokaż pasujące
                        </button>
                        <button className="btn">
                            Show/hide filtering options
                        </button>
                    </div>
                </div>
                <div className="wrapper pt-0">
                    <h1>Nadchodzące wydarzenia</h1>
                    <p>
                        Przeglądaj wydarzenia, zapisuj się i ciesz się
                        wyjątkowym czasem spędzonym ze swoim wiernym
                        towarzyszem!
                    </p>
                    <p>
                        Dzięki opcjom filtrowania, znajdziesz dokładnie to,
                        czego szukasz.
                    </p>
                    {events?.length ? (
                        <ol className="lg:grid lg:grid-cols-3 gap-4">
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
