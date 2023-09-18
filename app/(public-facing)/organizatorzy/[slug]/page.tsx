import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"


export default async function Page({ params }: { params: { slug: string } }) {

    const supabase = createServerComponentClient<Database>({ cookies })

    const { data: { user } } = await supabase.auth.getUser()

    const { data: organizer } = await supabase.from('organizers').select('name, description, id').eq('slug', params.slug).maybeSingle()

    // if no such organizer
    if (!organizer) {
        notFound()
    }

    const { data: events } = await supabase.from('events').select('id, name').eq('organizer_id', organizer.id)

    return (
        <main>
            <h1>{organizer.name}</h1>
            {organizer.id == user?.id && <Link href="/konto/dane_organizatorskie">Edytuj dane</Link>}
            <section>
                <h2>O organizatorze</h2>
                <p>{organizer.description}</p>
            </section>

            {events &&
                <div>
                    <h2>Nadchodzące wydarzenia organizowane przez {organizer.name}:</h2>
                    <ul>
                        {events.map(event => (
                            <li key={event.id}>{event.name}</li>
                        ))}
                    </ul>
                </div>
            }

            <section>
                <h2>Kontakt z organizatorem</h2>
                <p>Jeśli masz pytania dotyczące wydarzeń organizowanych przez {organizer.name}, skontaktuj się pod numerem 123, mailowo pod adresem xxx lub odwiedź stronę internetową abc, aby poznać więcej szczegółów.</p>
            </section>
        </main>
    )
}
