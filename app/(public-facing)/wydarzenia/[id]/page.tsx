import { supabaseAdmin } from "@/app/_utils/supabase-clients"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import SignUpButton from "./SignUpButton"
import { contactEmail } from "@/app/_utils/page_info"
import Link from "next/link"


export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { shcode?: string } }) {

    // inaczej to rozegrać, bo tak czy siak potrzebuję sprawdzić czy są miejsca na zapisy, czyli szczegóły dot. eventu biorę zawsze od supabaseAdmin

    const supabase = createServerComponentClient<Database>({ cookies })

    let { data: event } = await supabase.from('events').select('*, signups ( id ), organizers ( name, slug )').eq('id', params.id).maybeSingle()

    // event is private or doesn't exist
    if (!event) {
        // user has no special link
        if (!searchParams.shcode) {
            notFound()
        }

        // try to find the event using admin
        const { data: privateEvent } = await supabaseAdmin.from('events').select('*, signups ( id ), organizers ( name, slug )').eq('id', params.id).maybeSingle()

        // event doesn't exist
        if (!privateEvent) {
            notFound()
        }

        // special link is invalid
        if (!(searchParams.shcode === privateEvent.share_code)) {
            notFound()
        }

        event = privateEvent
    }

    return (
        <>
            <main>
                <h1>{event.name}</h1>
                {event.organizers && <p>Organizator: <Link href={`/organizatorzy/${event.organizers.slug}`}>{event.organizers.name}</Link></p>}
                <p>{event.description}</p>
                <p>Gotowi na przygodę? Zapisz się już dziś i weź udział w wyjątkowym wydarzeniu. Czekamy na Ciebie i Twojego pupila!</p>

                <div className="card shadow-lg shadow-slate-700/10">
                    <div className="card-body">
                        <p>Data: {event.starts_at}</p>
                        <p>Miejsce: {event.location}</p>
                        <p>Koszt uczestnictwa: {event.fee_pln ? event.fee_pln / 10 : 0} zł</p>
                        <p>Termin rejestracji: {event.signups_end_at}</p>
                    </div>
                    <div className="card-actions">
                        <p>Płatność tylko przez internet?</p>
                        <SignUpButton isSignedUp={!!event.signups.length} eventId={params.id} />
                    </div>
                </div>
            </main>
            <div>
                <p>Jeśli masz pytania lub potrzebujesz dodatkowych informacji, skontaktuj się z organizatorem pod adresem <a href={`mailto:`} className="link link-secondary">mailorganizatora@gdzies.pl</a></p>
            </div>
        </>
    )
}
