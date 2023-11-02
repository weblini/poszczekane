'use client'

import dynamic from 'next/dynamic'
import Loader from '../Loader'
import { useState } from 'react'
import Input from '../form-components/Input'

type Props = {
    tags: Tag[] | null,
    formAction: (formData: FormData) => Promise<void>
}

// seperate event map
const ClientOnlyLocationPicker = dynamic(
    () => import('./LocationPicker'),
    {
      loading: Loader,
      ssr: false
    }
  )

  
export default function AddEventForm({ tags, formAction }: Props) {

    const [location, setLocation] = useState('')
    const [geoPoint, setGeoPoint] = useState<GeoPoint | null>(null)

    return (
        <form action={formAction} className='flex flex-col gap-2'>
            <h2>Stwórz wydarzenie</h2>

            <p>Podaj wszystkie niezbędne informacje o swoim wydarzeniu:</p>

            <input name='name' type="text" placeholder="Event name" className="input input-bordered w-full max-w-xs" required />
            {/* this stuff needs Date & TIME selectors! */}
            <input name='starts' type="date" placeholder="Event start date" className="input input-bordered w-full max-w-xs" required onInputCapture={(e) => console.log(e)}/>
            <input name='signup-end' type="date" placeholder="Event signups close date" className="input input-bordered w-full max-w-xs" required />
            <input name='ends' type="date" placeholder="Event end date" className="input input-bordered w-full max-w-xs" required />
            <input name='spots' type="number" placeholder="Event max attendees" className="input input-bordered w-full max-w-xs" required />

            <Input label='Miejsce' name='location' value={location} onChange={(e) => setLocation(e.target.value)} required placeholder='ul. Wielkiej Łapy 10, Psiakowo'/>

            <ClientOnlyLocationPicker location={location} geoPoint={geoPoint} setGeoPoint={setGeoPoint}/>

            <p>Wymagane dane przy rejestracji?</p>

            <textarea name='desc' className="textarea textarea-bordered w-full max-w-xs" placeholder="Event description" required></textarea>

            <div className="join flex-wrap">
                {tags && tags.map(tag => (
                    <input className="join-item btn" type="checkbox" name='tag' value={tag.id} aria-label={tag.name} key={tag.id} />
                ))}
            </div>

            <button className="btn btn-primary">Opublikuj wydarzenie</button>
        </form>
    )
}