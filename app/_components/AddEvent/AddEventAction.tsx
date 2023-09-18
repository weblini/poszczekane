import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AddEventForm from './AddEventForm'
import { supabaseAnon } from '@/app/_utils/supabase-clients'


// this will need to be a client component for feedback?
export default async function AddEventAction() {

    // this is nice server side and cached
    const { data: tags } = await supabaseAnon.from('tags').select()

    return (
        <AddEventForm tags={tags} formAction={addEvent} />
    )
}

const addEvent = async (formData: FormData) => {
    'use server'
    // Create a Supabase client configured to use cookies
    const supabase = createServerActionClient<Database>({ cookies })

    // check if user is logged in & is_approved organizer
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) {
        // handle errors somehow nicely
        throw new Error("User must be logged in!")
    }

    // ! What date format does supabase take?
    // Use Zod instead maybe?
    const newRow = {
        description: String(formData.get('desc')),
        ends_at: String(formData.get('ends')),
        location: String(formData.get('location')),
        max_attendees: Number(formData.get('spots')),
        name: String(formData.get('name')),
        organizer_id: user.id,
        signups_end_at: String(formData.get('signup-end')),
        starts_at: String(formData.get('starts')),
        latitude: Number(formData.get('latitude')),
        longitude: Number(formData.get('longitude'))
    }

    //   try to add the event
    const { data: newEvent, error } = await supabase
        .from('events')
        .insert([
            newRow
        ])
        .select()

    //   console.log(newEvent || error)

    // if all good, try to add the tags
    if (newEvent) {
        const { data, error } = await supabase
            .from('event_tags')
            .insert(formData.getAll('tag').map(tag => ({ event_id: newEvent[0].id, tag_id: Number(tag) })))
            .select()

        // console.log(data || error)
    }
}