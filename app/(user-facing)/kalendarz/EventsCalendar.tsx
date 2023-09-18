'use client'


import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useEffect, useMemo, useState } from "react";
import { Schedulely, createDefaultAdapter, WeekDay } from "schedulely";
import NewEventsPopup from "./NewEventsPopup";
import DayList from './DayList';
import CalendarDay from './CalendarDay';
import CalendarHeader from './CalendarHeader';
import CalendarEvent from './CalendarEvent';

export type CalenderedAppEvent = Partial<AppEvent> & { id: number, name: string, starts_at: string, ends_at: string };


const dateAdapter = createDefaultAdapter('pl', WeekDay.Monday)

export const SelectedDayContext = createContext<Date | null>(null)


export default function EventsCalendar() {

    const [events, setEvents] = useState<CalenderedAppEvent[] | null>(null)
    const [selectedDay, setSelectedDay] = useState<Date | null>(null)
    // const [selectedEvent, setSelectedEvent] = useState('')

    useEffect(() => {
        async function fetchSignups() {
            // ! subscribe instead?
            const supabase = createClientComponentClient<Database>()

            const { data: signups, error } = await supabase.from('signups').select('events ( name, starts_at, ends_at, location, id )').order('events ( starts_at )', { ascending: true })

            if (error) {
                throw error
            }

            const retrievedEvents = signups?.reduce<CalenderedAppEvent[]>((allFiltered, current) => {
                if (current.events) {
                    allFiltered.push(current.events)
                }
                return allFiltered
            }, [])

            setEvents(retrievedEvents)
        }

        fetchSignups()
    }, [])


    const calendarView = useMemo(() => (
        <Schedulely
            events={events?.map(event => {
                return {
                    color: '#4b578a',
                    end: event.ends_at,
                    id: event.id.toString(),
                    start: event.starts_at,
                    summary: event.name,
                }
            }) || []}
            dateAdapter={dateAdapter}
            actions={{
                onDayClick: (day) => setSelectedDay(day),
                // onEventClick: (event) => setSelectedEvent(event.id)
            }}
            schedulelyComponents={{
                dayComponent: CalendarDay,
                headerComponent: CalendarHeader,
                eventComponent: CalendarEvent,
            }}
        />
    ), [events, dateAdapter, setSelectedDay])

    const dayView = useMemo(() => (
        !!events?.length &&
        <DayList events={events} dateAdapter={dateAdapter} selectedDate={selectedDay} />
    ), [selectedDay, events, dateAdapter])

    // const eventView = useMemo(() => (
    //     <EventDetails eventId={selectedEvent} clearSelected={() => setSelectedEvent('')} />
    // ),[selectedEvent, setSelectedEvent])

    const noEventsView = useMemo(() => (
        events?.length === 0 &&
        <NewEventsPopup />
    ), [events])



    return (
        <div>
            {noEventsView}

            {/* {eventView} */}

            <SelectedDayContext.Provider value={selectedDay}>
                {calendarView}
            </SelectedDayContext.Provider>

            {dayView}
        </div>

    )
}