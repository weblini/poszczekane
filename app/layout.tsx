import Link from 'next/link'
import './globals.css'
import { pageTitle } from '@/app/_utils/metadata'
import Image from 'next/image'
import logo from './images/logo.svg'
import UserProvider from './UserProvider'
import OnlyForUsers from './_components/OnlyForUsers'
import OnlyForOrganizers from './_components/OnlyForOrganizers'
import EventSearchBar from './_components/EventSearchBar'
import NavBarController from './NavBarController'
import { Noto_Sans } from 'next/font/google'

// Readex Pro is nice! But maybe too loose

// If loading a variable font, you don't need to specify the font weight
const mainFont = Noto_Sans({
    subsets: ['latin-ext'],
    display: 'swap',
    weight: ['400', '600', '800'],
})


export const metadata = {
    title: pageTitle,
    description: 'Najlepsze eventy dla psów i ich opiekunów!',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    const navContent = (
        <>
            <li><Link href="/wydarzenia">Wydarzenia</Link></li>
            <li><Link href="/organizatorzy">Organizatorzy</Link></li>
            <OnlyForUsers>
                <li><Link href="/kalendarz">Kalendarz</Link></li>
                <li><Link href="/konto">Konto</Link></li>
            </OnlyForUsers>
        </>
    )

    const navButton = (
        <OnlyForUsers
            fallback={(
                <>
                    <Link href="/rejestracja" className='btn btn-primary'>Załóż konto</Link>
                    <Link href="/logowanie" className='btn'>Zaloguj się</Link>
                </>
            )}>
            <OnlyForOrganizers>
                <Link href="/konto/moje_wydarzenia/dodaj_nowe" className='btn btn-secondary max-lg:w-full'>Dodaj wydarzenie</Link>
            </OnlyForOrganizers>
            <form action="/auth/sign-out" method="post">
                <button className='btn max-lg:w-full'>Wyloguj</button>
            </form>
        </OnlyForUsers>
    )

    return (
        <html lang="pl" className={mainFont.className}>
            <body className="min-h-screen bg-background flex flex-col items-center pt-16 lg:pt-0">
                <UserProvider>
                    <header className="w-full flex justify-center shadow shadow-stone-700/10 h-16 fixed top-0 z-50 bg-base-100 lg:static">
                        <nav aria-labelledby='główna' className="w-full max-w-screen-2xl flex justify-between items-center px-4 md:px-6 text-sm">
                            <div className="lg:flex-1">
                                <Link href="/" className='lg:block lg:w-fit'>
                                    <Image
                                        src={logo}
                                        height={45}
                                        alt="logo poszczekane"
                                    />
                                </Link>
                            </div>

                            <ul className="max-lg:hidden menu menu-horizontal mx-auto">
                                {navContent}
                            </ul>

                            <div className='max-lg:hidden flex gap-3 lg:flex-1 lg:justify-end'>
                                {navButton}
                            </div>

                            <label htmlFor="main-nav-toggle" className="lg:hidden btn btn-circle btn-ghost drawer-button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-7 h-7 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                            <div className="drawer fixed lg:hidden">
                                <NavBarController toggleId="main-nav-toggle" />
                                <div className="drawer-side top-16 h-[calc(100dvh-4rem)] border-t border-stone-200">
                                    <label htmlFor="main-nav-toggle" className="drawer-overlay"></label>
                                    <div className="px-3 py-6 w-80 min-h-full bg-base-100 flex flex-col">
                                        <ul className="menu p-0 pb-6">
                                            {navContent}
                                        </ul>
                                        <div className="mb-6"><EventSearchBar fieldId='main-search-form' /></div>
                                        <div className='mt-auto flex flex-col gap-3'>
                                            <ul className="menu p-0">
                                                <li><Link href="/jak_to_dziala">Jak to działa</Link></li>
                                                <li><Link href="/wspolpraca">Współpraca</Link></li>
                                                <li><Link href="/kontakt">Kontakt</Link></li>
                                            </ul>
                                            {navButton}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>

                    {children}

                </UserProvider>
            </body>
        </html>
    )
}
