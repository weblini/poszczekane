import { useContext } from "react";
import { DayComponentProps } from "schedulely";
import { SelectedDayContext } from "./EventsCalendar";


export default function CalendarDay({ isCurrentMonth, isToday, events, isOverflowed, onDayClick, date }: DayComponentProps) {

    const selectedDate = useContext(SelectedDayContext);

    const hiddenEventTooltip = `${events.filter((x) => !x.visible).length
        } więcej`;

    const isSelected = selectedDate?.getTime() === date.getTime()


    return (
        <div
            role={'cell'}
            className={`grid h-full cursor-pointer group ${isCurrentMonth ? 'bg-base-100' : 'bg-base-200 text-base-content/30'
                }`}
            onClick={() => onDayClick(date)}
        >
            <div role={'heading'} aria-level={2} className="text-center md:text-right w-full mt-1 px-1">
                <span className={`leading-none inline-flex rounded-full h-7 w-7 items-center justify-center transition-colors ${isToday ? 'font-bold' : ''} ${isSelected ? 'bg-primary text-primary-content' : 'group-hover:bg-primary/50'}`}>{date.getDate()}</span>
            </div>
            {isOverflowed && (
                <div
                    role={'note'}
                    className="text-center md:text-left text-neutral-focus font-bold mt-auto px-2"
                    title={hiddenEventTooltip}
                >
                    ...
                </div>
            )}
        </div>
    );
};