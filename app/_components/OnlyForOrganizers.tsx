'use client'


import { useContext } from "react"
import { UserContext } from "../UserProvider"



export default function NavBarDynamic({ children, fallback }: { children: React.ReactNode, fallback?: React.ReactNode}) {

    const userDetails = useContext(UserContext)

    if (!userDetails.isOrganizer) {
        if(fallback) {
            return fallback
        } else {
            return null
        }
    }

    return children
}