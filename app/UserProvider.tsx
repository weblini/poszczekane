'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect, createContext } from "react"

type UserDetails = {
    userId: string | null
    isOrganizer: boolean
}


export const UserContext = createContext<UserDetails>({ userId: null, isOrganizer: false })
 
export default function UserProvider({ children }: {children: React.ReactNode}) {
    const supabase = createClientComponentClient<Database>()

    const [userId, setUserId] = useState<UserDetails['userId']>(null)
    const [isOrganizer, setIsOrganizer] = useState(false)

    useEffect(() => {
        async function loadUserDetails() {
            const { data: { user } } = await supabase.auth.getUser()
            setUserId(user?.id || null)

            // try to find organizer matching user.id
            if (user) {
                const { data: organizer } = await supabase.from('organizers').select('id').eq('id', user.id).maybeSingle()
                setIsOrganizer(organizer ? true : false)
            } else {
                setIsOrganizer(false)
            }
        }

        loadUserDetails()
    }, [supabase])

  return <UserContext.Provider value={{ userId, isOrganizer }}>{children}</UserContext.Provider>
}