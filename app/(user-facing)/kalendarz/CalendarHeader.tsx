import { HeaderComponentProps } from "schedulely";


export default function CalendarHeader({ month, year, onNextMonth, onPrevMonth }: HeaderComponentProps) {

    return (
        <div className="flex items-center bg-base-200">

            <span role={'heading'} aria-level={1} className="mr-auto px-6 md:px-4 font-medium">
                <span className="capitalize">{month}</span> {year}
            </span>

            <button className="btn btn-square btn-ghost" onClick={onPrevMonth} title="Poprzedni miesiąc">
                <svg className="h-7 w-7 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" /></svg>
            </button>

            <button className="btn btn-ghost">Dziś</button>

            <button className="btn btn-square btn-ghost" onClick={onNextMonth} title="Następny miesiąc">
                <svg className="h-7 w-7 fill-current" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};