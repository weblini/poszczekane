import EventCard from "@/app/_components/EventCard";
import { CalenderedAppEvent } from "./EventsCalendar";
import { DateTimeAdapter } from "schedulely";
import InfoDiv from "@/app/_components/InfoDiv";

type Props = {
    events: CalenderedAppEvent[];
    selectedDate: Date | null;
    dateAdapter: DateTimeAdapter;
};

export default function DayList({ events, selectedDate, dateAdapter }: Props) {
    if (!selectedDate) {
        return (
            <InfoDiv>
                <p>
                    Kliknij na konkretny dzień w kalendarzu, aby zobaczyć
                    wszystkie zaplanowane wydarzenia w tej dacie.
                </p>
            </InfoDiv>
        );
    }

    const matchingEvents = events.filter((event) =>
        dateAdapter.isDateBetween(
            selectedDate,
            new Date(event.starts_at),
            new Date(event.ends_at)
        )
    );

    return (
        <>
            <p className="title-ghost pb-2">{selectedDate.toLocaleDateString()}</p>
            {matchingEvents.length ? (
                <ol>
                    {events.map((event) => {
                        if (
                            dateAdapter.isDateBetween(
                                selectedDate,
                                new Date(event.starts_at),
                                new Date(event.ends_at)
                            )
                        ) {
                            return (
                                <li key={event.id}>
                                    <EventCard event={event} />
                                </li>
                            );
                        }
                        return null;
                    })}
                </ol>
            ) : (
                <InfoDiv>
                    <p>
                        Obecnie nie masz zapisanych żadnych wydarzeń na ten
                        dzień
                    </p>
                </InfoDiv>
            )}
        </>
    );
}
