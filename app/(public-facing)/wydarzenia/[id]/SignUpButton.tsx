import { supabaseAdmin } from "@/app/_utils/supabase-clients"
import Link from "next/link"

type Props = {
    isSignedUp: boolean
    eventId: string
}


export default async function SignUpButton({ isSignedUp, eventId }: Props) {

    // ! check if isExternal -> return link to original page and button to save to calendar

    if(isSignedUp) {
        return (
            <div>
                <span className="text-sm">Jesteś już zapisany/a</span>
                <Link href="/kalendarz" className="btn btn-success">Zobacz w kalendarzu</Link>
            </div>
            
          )
    }

    // grab total spots and current number of signups
    const { data: event, error } = await supabaseAdmin.from('events').select('max_attendees, signups ( id )').eq('id', eventId).maybeSingle()

    if (!event || error) {
        throw error || new Error("Failed to fetch event info")
    }

    const availableSpots = event.max_attendees - event.signups.length

    if (availableSpots > 0) {
        <div>
        <button className="btn btn-primary">Zapisz się</button>
        {availableSpots < 3 && <span className="text-sm">Ostatnie wolne miejsca!</span>}
    </div>
    }

  return (
    <div>
        <button className="btn btn-disabled" aria-disabled>Brak miejsc</button>
    </div>
  )
}