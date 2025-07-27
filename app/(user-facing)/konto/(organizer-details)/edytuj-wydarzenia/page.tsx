import EventCard from "@/app/_components/EventCard";
import { supabaseAdmin } from "@/app/_utils/supabase-clients";
import { createClient } from "@/app/_utils/supabase/server";
import Link from "next/link";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw "No user detected";
    }

    const { data: events } = await supabaseAdmin
        .from("events")
        .select("*, tags ( name ), signups ( id )")
        .eq("organizer_id", user.id)
        .order("starts_at", { ascending: false });

    return (
        <>
            <p className="pb-2 md:pb-3">
                Witaj w panelu edycji wydarzeń. Tutaj możesz zarządzać swoimi
                wydarzeniami w prosty i wygodny sposób.
            </p>

            <Link href="/konto/dodaj-wydarzenie" className="btn btn-square">
                <svg
                    className="v-6 h-6 fill-base-content/80"
                    viewBox="0 -960 960 960"
                >
                    <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
                </svg>
            </Link>

            {!!events?.length && (
                <ol className="grid gap-4 pt-2">
                    {events.map((event) => (
                        <li key={event.id}>
                            <EventCard
                                key={event.id}
                                event={event}
                                buttons={
                                    <>
                                        {!event.is_cancelled && (
                                            <button className="btn btn-error btn-outline mr-auto">
                                                Odwołaj
                                            </button>
                                        )}

                                        <button className="btn">
                                            Dane uczestników
                                        </button>
                                    </>
                                }
                            >
                                <p>
                                    Liczba rejestracji: {event.signups.length}/
                                    {event.max_attendees}
                                </p>
                            </EventCard>
                        </li>
                    ))}
                </ol>
            )}
        </>
    );
}
