'use client'

import { useContext } from "react"
import { UserContext } from "./UserProvider"
import Link from "next/link"



export default function NavButtons() {

    const userDetails = useContext(UserContext)

    return (
        userDetails.userId ?
        <>
            {userDetails.isOrganizer && <Link href="/konto/moje_wydarzenia/dodaj_nowe" className='btn btn-square btn-accent'>+</Link>}
            <form action="/auth/sign-out" method="post">
                <button className='btn'>
                    Wyloguj
                </button>
            </form>
        </>
        :
        <Link href="/login" className='btn separate'>Zaloguj się</Link>
    )
}