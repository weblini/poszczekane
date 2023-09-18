import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import RegisterOrganizer from "./RegisterOrganizer"

export default async function Layout({ children }: { children: React.ReactNode }) {

  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  const { data: organizer } = await supabase.from('organizers').select().eq('id', user?.id).maybeSingle()

  if (!organizer) {
    return (
        <div>
            <h2>Zostań organizatorem, aby tworzyć nowe wydarzenia!</h2>
            <RegisterOrganizer />
        </div>
    )
  }

  return (
    <>
    {children}
    </>
  )
}