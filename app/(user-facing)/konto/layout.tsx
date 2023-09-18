import LoginWall from "@/app/_components/LoginWall"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"


export default async function Layout({ children }: { children: React.ReactNode }) {

	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: { session } } = await supabase.auth.getSession()

	if (!session) {
        <LoginWall alternate={
            <p>Lub <Link className="link link-hover" href="/rejestracja">załóż konto</Link> i zacznij planować Wasze wspólne przygody.</p>
        }/>
	}

	return (
		<div className="grow w-5/6">
			{session &&
			<nav aria-labelledby="zarządzanie kontem">
				<ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
				    <li><Link href='/konto'>dane uczestnika</Link></li>
					<li><Link href='/konto/dane_organizatorskie'>dane organizatora</Link></li>
					<li><Link href='/konto/moje_wydarzenia'>przegląd wydarzeń</Link></li>
				</ul>
			</nav>
			}
			
			{children}
		</div>
	)
}
