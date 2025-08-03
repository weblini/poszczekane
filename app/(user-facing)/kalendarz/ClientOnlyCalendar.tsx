'use client'

import dynamic from 'next/dynamic'

const Calendar = dynamic(() => import('./EventsCalendar'), {
  ssr: false,
})

export default Calendar