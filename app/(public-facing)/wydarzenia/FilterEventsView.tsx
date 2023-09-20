"use client";

import EventCard from "@/app/_components/EventCard";
import InputField from "@/app/_components/InputField";
import { getTagParams } from "@/app/_utils/url-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {
    allTags: Tag[] | null;
    cachedEvents: PartialAppEvent[] | null;
};

// ! refactor into hook, cause this is ugly as hell

export default function FilterEventsView({ allTags, cachedEvents }: Props) {
    const searchParams = useSearchParams();
    // this changes with history push. use it on Client side, and the searchparams on SSR
    console.log(window?.location.search)

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState<
        PartialAppEvent[] | null
    >(cachedEvents);

    async function fetchMatchingEvents(searchParams: URLSearchParams) {
        const supabase = createClientComponentClient<Database>();
        // base query, grab all events without filters
        let supaQuery = supabase
            .from("events")
            .select(
                "name, starts_at, ends_at, id, organizers( name, slug ), tags( name ), filter_tags:tags!inner(name)"
            );

        // filter by tags if provided
        const tags = searchParams.getAll("tag");
        if (tags.length) {
            supaQuery = supaQuery.in("filter_tags.name", tags);
        }

        const { data: events, error } = await supaQuery;
        // ! add error handling!
        setFilteredEvents(events);
    }

    useEffect(() => {
        // match filter selection to searchParams
        setSelectedTags(searchParams.getAll("tag"));
        // grab up-to-date events
        fetchMatchingEvents(searchParams)
    }, []);

    async function handleApplyFilters(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        // define new URLSearchParams
        const newSearchParams = getTagParams(selectedTags);
        window.history.pushState({search: newSearchParams.toString()},'',`?${newSearchParams.toString()}`);
        await fetchMatchingEvents(newSearchParams);

        setIsLoading(false);
    }

    async function resetFilters() {
        setIsLoading(true);

        setSelectedTags([]);
        window.history.pushState({search: ''},'',`/wydarzenia`);
        await fetchMatchingEvents(new URLSearchParams());

        setIsLoading(false);
    }

    const updateTags = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedTags([...selectedTags, value]);
        } else {
            setSelectedTags(selectedTags.filter((tag) => tag !== value));
        }
    };

    return (
        <main className="w-full">
            <div className="px-[5vw] py-6">
                <form onSubmit={handleApplyFilters}>
                    <p className="text-error">
                        Make this a fixed round button at the bottom left corner
                        on mobile
                    </p>
                    <p>
                        Dzięki opcjom filtrowania, znajdziesz dokładnie to,
                        czego szukasz.
                    </p>
                    <div className="form-control">
                        <div className="flex flex-wrap gap-2 py-4">
                            {allTags?.map((tag) => (
                                <input
                                    key={tag.id}
                                    type="checkbox"
                                    name="tag"
                                    value={tag.name}
                                    aria-label={tag.name}
                                    className="btn font-normal rounded-full h-6 min-h-6"
                                    checked={selectedTags?.includes(tag.name)}
                                    onChange={updateTags}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="md:flex gap-4">
                        <InputField label="Województwo" name="wojewodztwo" />
                        <InputField
                            label="Najwcześniejszy termin"
                            name="od_daty"
                            type="date"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button className="btn btn-secondary">
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Szukam
                                </>
                            ) : (
                                <>
                                    <svg
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        className="fill-current"
                                    >
                                        <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                    </svg>
                                    Pokaż pasujące
                                </>
                            )}
                        </button>
                        <button
                            className="btn btn-ghost"
                            type="button"
                            onClick={resetFilters}
                        >
                            Wyłącz filtry
                        </button>
                    </div>
                </form>
            </div>
            <div className="wrapper pt-0">
                <h1 className="font-black text-base-content/30 text-xl md:text-3xl">
                    Nadchodzące wydarzenia
                </h1>
                <p>
                    Przeglądaj wydarzenia, zapisuj się i ciesz się wyjątkowym
                    czasem spędzonym ze swoim wiernym towarzyszem!
                </p>
                {filteredEvents?.length ? (
                    <div className="grid lg:grid-cols-3 gap-4 pt-6">
                        {filteredEvents.map((event) => (
                            <EventCard event={event} key={event.id} />
                        ))}
                    </div>
                ) : (
                    <div className="grid min-h-[400px] place-items-center">
                        <p className="text-center">
                            Bardzo nam przykro, ale wygląda na to, że nie ma
                            wydarzeń spełniających Twoje kryteria.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
