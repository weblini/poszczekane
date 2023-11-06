import { supabaseAnon } from "app/_utils/supabase-clients";
import EventCardDisplay from "./EventCardDisplay";


export default async function UpcomingEvents() {

    // ! make this custom for logged in users (adjust to their preferences)
    const { data: events, error } = await supabaseAnon
        .from("events")
        .select(
            "id, name, starts_at, ends_at, location, tags ( name )"
        )
        .neq("is_cancelled", true)
        .gte("ends_at", new Date().toISOString())
        .limit(3);

    if (error) {
        console.log(error)
    }

    if (!events?.length) {
        return null
    }

    return (
        <EventCardDisplay events={events} />
    )
}
