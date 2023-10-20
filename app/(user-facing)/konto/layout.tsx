import Link from "next/link";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grow w-5/6">
            <nav aria-labelledby="zarządzanie kontem">
                <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                    <li>
                        <Link href="/konto">dane uczestnika</Link>
                    </li>
                    <li>
                        <Link href="/konto/dane_organizatorskie">
                            dane organizatora
                        </Link>
                    </li>
                    <li>
                        <Link href="/konto/moje_wydarzenia">
                            przegląd wydarzeń
                        </Link>
                    </li>
                </ul>
            </nav>

            {children}
        </div>
    );
}
