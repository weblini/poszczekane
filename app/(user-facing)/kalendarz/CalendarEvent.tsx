import { EventComponentProps } from "schedulely";

export default function CalendarEvent({ event, isHovered, onClick }: EventComponentProps) {

    return (
        <div
            role={'listitem'}
            data-eventid={event.id}
            className={`md:pointer-events-auto z-10 cursor-default rounded-btn mx-[2px] transition-colors ${isHovered ? 'bg-accent-focus' : 'bg-accent'}`}
            title={event.summary}
            onClick={() => onClick(event)}
        >
            <p className="overflow-hidden text-ellipsis px-2">{event.summary}</p>
        </div>
    );
};