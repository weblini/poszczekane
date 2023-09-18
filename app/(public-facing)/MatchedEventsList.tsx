import { supabaseAnon } from "../_utils/supabase-clients"
import EventCard from "../_components/EventCard"
import Link from "next/link"

type Props = {
    title: string,
    children: React.ReactNode,
    matchedTags: string[]
}



export default async function MatchedEventsList({ title, matchedTags, children }: Props) {

    // grab future, not cancelled events that match tags
    const { data: events, error } = await supabaseAnon
        .from('events')
        .select(`id, name, starts_at, location, tags!inner( name )`)
        .neq('is_cancelled', true)
        .gte('starts_at', (new Date).toISOString())
        .in('tags.name', matchedTags)
        .limit(3)

    if (error) {
        throw error;
    }

    const searchParamString = matchedTags.map(tag => `tag=${tag}`).join('&')


    return (
        <section className="text-center flex flex-col">
            <h2 className="title-base pb-2">{title}</h2>
            <div className='text-base-content/80'>{children}</div>
            
            <div className="pt-8 flex flex-col gap-2 text-left">
                {!!events?.length ?
                    <>
                        {events.map(event => (
                            <EventCard event={event} key={event.id} extraClasses="max-w-lg self-center"/>
                        ))}
                        <Link className="btn btn-ghost" href={`/wydarzenia?${searchParamString}`}>Więcej wydarzeń</Link>
                    </>
                    :
                    <Link className="btn btn-ghost" href='/wydarzenia'>Przeglądaj wszystkie wydarzenia</Link>
                }
            </div>

        </section>
    )
}