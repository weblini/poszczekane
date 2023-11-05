import EventCard from "@/app/_components/EventCard";
import InfoDiv from "@/app/_components/InfoDiv";
import { getStartOfDayDate } from "@/app/_utils/date-helper";
import { supabaseAnon } from "@/app/_utils/supabase-clients";
import { getEventsUrl } from "@/app/_utils/url-query";
import { count } from "console";
import Link from "next/link";

type Props = {
    tags: string[];
    date?: string;
    page: number;
};

export default async function FilteredEventsList({ date, tags, page }: Props) {
    // base query, grab all events without filters
    let supaQuery = supabaseAnon
        .from("events")
        .select(
            "name, starts_at, ends_at, id, external_url, organizers( name, slug ), tags( name ), filter_tags:tags!inner(name)",
            { count: "exact" }
        );

    // filter by tags if provided
    if (tags.length) {
        supaQuery = supaQuery.in("filter_tags.name", tags);
    }

    // filter by end date (if none provided compare to now)
    const filterDate = date ? getStartOfDayDate(date) : new Date();
    supaQuery = supaQuery.gte("ends_at", filterDate.toISOString());

    // adjust pagination
    const startIndex = (page - 1) * numberOfResults;
    const endIndex = startIndex + numberOfResults;

    const {
        data: events,
        error,
        count,
    } = await supaQuery
        .order("starts_at", { ascending: true })
        .range(startIndex, endIndex);

    if (!events?.length || !count) {
        return (
            <InfoDiv>
                <p>
                    Bardzo nam przykro, ale wygląda na to, że nie ma wydarzeń
                    spełniających Twoje kryteria.
                </p>
                <Link href="/wydarzenia" className="btn btn-neutral">
                    Pokaż wszystkie wydarzenia
                </Link>
            </InfoDiv>
        );
    }

    return (
        <>
            <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4">
                {events.map((event) => (
                    <EventCard event={event} key={event.id} />
                ))}
            </div>

            {(page > 1 || endIndex < count) && (
                <div className="join pt-4 flex justify-center">
                    {page > 1 && (
                        <Link
                            href={getEventsUrl({ tags, date, page: page - 1 })}
                            className="join-item btn"
                        >
                            <svg
                                viewBox="0 -960 960 960"
                                className="fill-base-content h-6 w-6"
                            >
                                <path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z" />
                            </svg>
                        </Link>
                    )}
                    <p className="join-item btn pointer-events-none max-sm:grow">
                        Strona {page}
                    </p>
                    {endIndex < count && (
                        <Link
                            href={getEventsUrl({ tags, date, page: page + 1 })}
                            className="join-item btn"
                        >
                            <svg
                                viewBox="0 -960 960 960"
                                className="fill-base-content h-6 w-6"
                            >
                                <path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
                            </svg>
                        </Link>
                    )}
                </div>
            )}
        </>
    );
}

const numberOfResults = 12;
