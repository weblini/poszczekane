'use client'


import { useContext } from "react"
import { UserContext } from "../UserProvider"



export default function NavBarDynamic({ children, fallback }: { children: React.ReactNode, fallback?: React.ReactNode}) {

    const userDetails = useContext(UserContext)

    if (!userDetails.userId) {
        return (
            fallback ?
            <>{fallback}</>
            :
            null
        )
    }

    return (
        <>
            {children}
        </>
    )
}