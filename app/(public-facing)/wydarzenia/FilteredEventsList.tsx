import EventCard from "@/app/_components/EventCard";
import { getStartOfDayDate } from "@/app/_utils/date-helper";
import { supabaseAnon } from "@/app/_utils/supabase-clients";
import Link from "next/link";

type Props = {
    tags: string[], 
    date?: string
};


export default async function FilteredEventsList({ date, tags }: Props) {
    // base query, grab all events without filters
    let supaQuery = supabaseAnon
        .from("events")
        .select(
            "name, starts_at, ends_at, id, organizers( name, slug ), tags( name ), filter_tags:tags!inner(name)"
        );

    // filter by tags if provided
    if (tags.length) {
        supaQuery = supaQuery.in("filter_tags.name", tags);
    }

    // filter by end date (if none provided compare to now)
    const filterDate = date ? getStartOfDayDate(date) : new Date
    supaQuery = supaQuery.gte('ends_at', filterDate.toISOString())

    const { data: events, error } = await supaQuery;


    if (!events?.length) {
        return (
            <div className="text-center p-6 flex flex-col gap-4 justify-center items-center w-full rounded-box bg-base-200 border border-base-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-neutral/80 w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <p>
                    Bardzo nam przykro, ale wygląda na to, że nie ma wydarzeń
                    spełniających Twoje kryteria.
                </p>
                <Link href="/wydarzenia" className="btn btn-neutral">
                    Pokaż wszystkie wydarzenia
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4">
            {events.map((event) => (
                <EventCard event={event} key={event.id} />
            ))}
        </div>
    );
}
