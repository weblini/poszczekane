import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// should check if signed in at all, if not redirect to login

export default async function RegisterOrganizer() {
  const register = async (formData: FormData) => {
    'use server'

    const name = formData.get('name')
    const description = formData.get('description')

    if (name) {
      // get the logged in user and his id
      const supabase = createServerActionClient({ cookies })

      const { data: { user } } = await supabase.auth.getUser()

    //   !! handle the error if any
        const { data, error } = await supabase
        .from('organizers')
        .insert([
        { name, description, id: user?.id },
        ])
        .select()
    }
  }

  return (
    <form action={register} className='grid gap-4 bg-slate-300 p-12'>
        <input name="name" placeholder='the name' />
        <textarea name="description" placeholder='the description'/>
        <button>register</button>
    </form>
  )
}