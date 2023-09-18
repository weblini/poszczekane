import LoginWall from "@/app/_components/LoginWall"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function Layout({children}: {children: React.ReactNode}) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        return (
            <LoginWall alternate={
                <p>Lub <Link className="link link-hover" href="/rejestracja">załóż konto</Link>, aby zacząć korzystać z osobistego kalendarza</p>
            }/>
        )
    }

    return (
        <>
            {children}
        </>
    )
}