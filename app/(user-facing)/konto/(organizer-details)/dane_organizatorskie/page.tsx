import { supabaseAdmin } from "@/app/_utils/supabase-clients"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Page() {

  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  const { data: organizer, error } = await supabaseAdmin.from('organizers').select().eq('id', user?.id).limit(1).single()

  const { data: protectedData } = await supabaseAdmin.from('organizers_protected').select('account_number').eq('id', user?.id).limit(1).single()

  error && console.log(error)

  return (
    <>
      <h2>Dane organizatora</h2>
      <p>{organizer?.name}</p>
      <p>{organizer?.description || "no description set up"}</p>
      <p>{organizer?.contact_email || "no contact email set up"}</p>
      <p>{protectedData?.account_number || "no account number present"}</p>
    </>
  )
}
