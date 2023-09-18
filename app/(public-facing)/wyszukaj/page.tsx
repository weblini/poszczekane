import EventCard from "@/app/_components/EventCard"
import EventSearchBar from "@/app/_components/EventSearchBar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

type Props = {
    searchParams: { q?: string }
}


export default async function Page({ searchParams }: Props) {

    // make this a client component for better UX? or combine server outside with client inside?...?

    const searchField = (<EventSearchBar fieldId="search-page-search" />)

    // check if has a searchQuery
    if (!searchParams.q) {
        return (
            <main className="w-full">
                <h1>Szukaj wydarzenia</h1>
                {searchField}
            </main>
        )
    }

    // grab search params and perform textSearch with supabase
    const supabase = createServerComponentClient<Database>({ cookies })

    const { data: matchingEvents, error } = await supabase
        .from('events')
        .select('*, tags ( name ), organizers ( name )')
        .textSearch('name', `${searchParams.q}`, {
            type: 'websearch'
        })

    if (error) {
        throw error
    }


    return (
        <div className="w-full">
            <div className="w-full py-12 px-8">
                {searchField}
            </div>

            <main>
                <h1>Wyniki wyszukiwania</h1>
                <p>dla "{searchParams.q}"</p>
                {matchingEvents?.length ?
                    <div className="flex flex-col gap-6">
                        {matchingEvents?.map(event => (
                            <EventCard event={event} />
                        ))}
                    </div>
                    :
                    <p className="text-3xl">Nie znaleźliśmy żadnych pasujących wydarzeń</p>
                }

            </main>
        </div>
    )
}