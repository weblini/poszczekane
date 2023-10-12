import EventCard from "@/app/_components/EventCard";
import { supabaseAnon } from "@/app/_utils/supabase-clients";


export default async function UpcomingEvents() {

    // ! make this custom for logged in users (adjust to their preferences)
    const { data: events, error } = await supabaseAnon
        .from("events")
        .select(
            "id, name, starts_at, ends_at, tags ( name )"
        )
        .neq("is_cancelled", true)
        .gte("ends_at", new Date().toISOString())
        .limit(3);

    if (error) {
        console.log(error)
    }

    return (
        <>
            {events?.map(event => (
                <EventCard event={event} key={event.id}/>
            ))}
        </>
    )
}
