import { supabaseAnon } from "../_utils/supabase-clients";
import EventCard from "../_components/EventCard";
import Link from "next/link";
import { getTagParams } from "../_utils/url-query";

type Props = {
    matchedTags: string[];
};

export default async function MatchedEventsList({ matchedTags }: Props) {

    // grab future, not cancelled events that match tags
    const { data: events, error } = await supabaseAnon
        .from("events")
        .select(
            `id, name, starts_at, location, tags( name ), filter_tags:tags!inner( name )`
        )
        .neq("is_cancelled", true)
        .gte("starts_at", new Date().toISOString())
        .in("filter_tags.name", matchedTags)
        .limit(3);

    if (error) {
        throw error;
    }


    if (!events?.length) {
        return (
            <Link className="btn btn-ghost" href="/wydarzenia">
                Przeglądaj wszystkie wydarzenia
            </Link>
        );
    }

    const searchParamString = getTagParams(matchedTags).toString();

    return (
        <>
            {events.map((event) => (
                <EventCard
                    event={event}
                    key={event.id}
                    extraClasses="max-w-lg self-center"
                />
            ))}
            <Link
                className="btn btn-ghost"
                href={`/wydarzenia?${searchParamString}`}
            >
                Więcej wydarzeń
            </Link>
        </>
    );
}
