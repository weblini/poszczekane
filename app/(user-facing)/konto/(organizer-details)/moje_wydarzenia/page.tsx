import AddEventAction from "@/app/_components/AddEvent/AddEventAction"
import EventCard from "@/app/_components/EventCard"
import { supabaseAdmin } from "@/app/_utils/supabase-clients"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function Page() {

	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: { user } } = await supabase.auth.getUser()

	const { data: events } = await supabaseAdmin.from('events').select('*, tags ( name ), signups ( id )').eq('organizer_id', user?.id)

	if (!events || !events[0]) {
		return (
			<div>
				<p>Nie masz jeszcze utworzonych wydarzeń</p>
				<AddEventAction />
			</div>
		)
	}

	return (
		<>
			<Link href='/konto/moje_wydarzenia/dodaj_nowe' className="btn btn-square">+</Link>
			<ol>
				{events.map(event => (
					<li key={event.id}>
						<EventCard key={event.id} event={event} buttons={(
							<>
								<button className="btn btn-error">Odwołaj</button>
								<button className="btn btn-info">Dane uczestników</button>
							</>
						)}>
							<p>Liczba rejestracji: {event.signups.length}/{event.max_attendees}</p>
							<p>Dane zwrotne dla każdego z uczestników? Np. numer startowy, godzina wejścia itp?</p>
						</EventCard>
					</li>
				))}
			</ol>
		</>
	)
}
