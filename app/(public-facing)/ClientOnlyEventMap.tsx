'use client'
import dynamic from 'next/dynamic'

const EventsMap = dynamic(() => import('./EventsMap'), {
  ssr: false,
})

export default EventsMap