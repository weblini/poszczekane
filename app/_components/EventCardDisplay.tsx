import EventCard from "./EventCard";

type Props = {
    events: (Partial<AppEvent> & { name: string; id: number })[];
};

export default function EventCardDisplay({events}: Props) {
    return (
        <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4">
            {events.map((event) => (
                <EventCard event={event} key={event.id} />
            ))}
        </div>
    );
}
