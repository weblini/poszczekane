import EventCard from "@/app/_components/EventCard"
import { CalenderedAppEvent } from "./EventsCalendar"
import { DateTimeAdapter } from "schedulely"

type Props = {
    events: CalenderedAppEvent[],
    selectedDate: Date | null,
    dateAdapter: DateTimeAdapter
}


export default function DayList({ events, selectedDate, dateAdapter }: Props) {

    if (!selectedDate) {
        return null
    }

    const matchingEvents = events.filter(event => dateAdapter.isDateBetween(selectedDate, new Date(event.starts_at), new Date(event.ends_at)))

    return (
        <div>
            <p>{selectedDate.toLocaleDateString()}</p>
            {matchingEvents.length ?
                <ol>
                    {events.map(event => {
                        if (dateAdapter.isDateBetween(selectedDate, new Date(event.starts_at), new Date(event.ends_at))) {
                            return (<li key={event.id}><EventCard event={event} /></li>)
                        }
                        return null
                    })}
                </ol>
                :
                <p>Obecnie nie masz zapisanych żadnych wydarzeń na ten dzień</p>
            }

        </div>
    )
}