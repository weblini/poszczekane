'use client'


import { useContext } from "react"
import { UserContext } from "../UserProvider"



export default function NavBarDynamic({ children }: {children: React.ReactNode}) {

    const userDetails = useContext(UserContext)

    if (!userDetails.isOrganizer) {
        return null
    }

    return (
        <>
            {children}
        </>
    )
}