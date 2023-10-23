import Link from "next/link";
import OnlyForOrganizers from "./OnlyForOrganizers";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-8 py-12 bg-base-200 w-full md:px-12 md:py-16 mt-auto">
            <div className="footer max-w-screen-2xl mx-auto">
                <div className="md:order-last">
                    <span className="footer-title">Newsletter</span>
                    {/* ! make this a Client Component */}
                    <form className="form-control max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                Otrzymuj wiadomości na temat nadchodzących wydarzeń
                            </span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="twójmail@poczta.pl"
                                className="input input-bordered w-full pr-24"
                            />
                            <button className="btn btn-neutral absolute top-0 right-0 rounded-l-none">
                                Zapisz się
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <span className="footer-title">Informacje</span>
                    <Link href="/jak_to_dziala" className="link link-hover">
                        Jak to działa
                    </Link>
                    <Link href="/regulamin" className="link link-hover">
                        Regulamin
                    </Link>
                    <Link href="/kontakt" className="link link-hover">
                        Kontakt
                    </Link>
                    <Link href="/prywatnosc" className="link link-hover">
                        Prywatność
                    </Link>
                </div>
                <div>
                    <span className="footer-title">Dla organizatorów</span>
                    <OnlyForOrganizers fallback={<Link href="/zostan_organizatorem" className="link link-hover">Zostań organizatorem</Link>}>
                        <Link
                            href="/konto/dane_organizatorskie"
                            className="link link-hover"
                        >
                            Zarządzaj danymi
                        </Link>
                    </OnlyForOrganizers>
                    <Link href="/wspolpraca" className="link link-hover">
                        Współpraca
                    </Link>
                    <Link
                        href="/jak_dodac_wydarzenie"
                        className="link link-hover"
                    >
                        Jak dodać wydarzenie
                    </Link>
                </div>
                <div className="md:-order-last">
                    <svg
                        width="50"
                        height="44"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 88"
                        className="opacity-30"
                    >
                        <path d="m24.69,25.43c3.27-.59,7.36-1.52,11.59-.69,7.37,2.9,14.19,11.71,14.33,19.98-1.12.33-22.27,6.49-22.64,6.66,1.06,4.23,3.09,6.92,7.82,7.09,5.31.19,9.89-4.24,14.59-6.44l1.23.9,4.03,9.36-.47,1.61C31.75,85.42,1.86,71.35,7.14,39.31c.29-.21-.15.14,0,0,2.34-8.43,8.29-11.64,17.55-13.88Zm2.53,9.28c-2.24.53-2.16,7.03-.38,7.68,0,0,5.04-1.46,5.04-1.46-1.15-2.01-1.55-6.9-4.66-6.22Z" />
                        <path d="m68.31,14.86l.25.45.26-.05c.41.62,6.13,2.72,5.67,3.75-2.66,4.48-11.1,13.44-14.87,16.93-.5.28-2.21-.65-2.61-.82-.15-.15-2.76-1.66-3.16-2.13-.4-.23,9.08-18.29,11.33-19.3,1.49-.85,2.21.64,3.13,1.16Z" />
                        <path d="m92.92,32.41c-.07.83,3.11,5.93,1.87,6.61-6.01,2.5-20.67,5.87-27.02,6.77-.7-.05-1.16-2.5-1.43-2.91-.04-.23-1.55-2.6-1.59-3.29-.22-.46,22.49-11.79,25.47-11.33,2.11.13,2.69,4.16,2.69,4.16Z" />
                        <path d="m88.03,60.95l-.32.36.14.22c-.42.56.2,3.47-.92,3.39-5.12-.94-17.22-6.18-21.84-8.42-.45-.35,1.29-4.29,1.57-4.79.07-.42,20.31,1.98,22.07,3.65,1.34,1.04-.56,4.61-.7,5.59Z" />
                    </svg>
                    <p>Najlepsze psie eventy</p>
                    <p>© {currentYear} poszczekane.pl</p>
                </div>
            </div>
        </footer>
    );
}
