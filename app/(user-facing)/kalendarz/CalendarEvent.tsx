import { EventComponentProps } from "schedulely";

export default function CalendarEvent({ event, isHovered, onClick }: EventComponentProps) {

    return (
        <div
            role={'listitem'}
            data-eventid={event.id}
            className={`z-10 cursor-default rounded-btn mx-[2px] transition-colors text-secondary-content ${isHovered ? 'bg-secondary-focus' : 'bg-secondary'}`}
            title={event.summary}
            onClick={() => onClick(event)}
        >
            <p className="overflow-hidden text-ellipsis px-2">{event.summary}</p>
        </div>
    );
};