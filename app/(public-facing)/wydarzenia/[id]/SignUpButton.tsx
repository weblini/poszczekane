import { supabaseAdmin } from "@/app/_utils/supabase-clients"

type Props = {
    isSignedUp: boolean
    eventId: string
}


export default async function SignUpButton({ isSignedUp, eventId }: Props) {

    if(isSignedUp) {
        return (
            <div>
                <span className="text-sm">Już zapisano</span>
                <button className="btn btn-success">Szczegóły</button>
            </div>
            
          )
    }

    // grab total spots and current number of signups
    const { data: event, error } = await supabaseAdmin.from('events').select('max_attendees, signups ( id )').eq('id', eventId).maybeSingle()

    if (!event || error) {
        throw error || new Error("Failed to fetch event info")
    }

    const availableSpots = event.max_attendees - event.signups.length

  return (
    <div>
        <button className="btn btn-primary">{availableSpots ? "Zapisz się" : "Brak miejsc"}</button>
        {availableSpots < 3 && <span className="text-sm">Ostatnie wolne miejsca!</span>}
    </div>
  )
}