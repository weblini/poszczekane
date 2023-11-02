import OnlyForOrganizers from "@/app/_components/OnlyForOrganizers";
import Link from "next/link";
import SettingWrapper from "./SettingWrapper";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

export default function Page() {
    return (
        <main>
            <p className="pb-4 lg:pb-6">
                Witaj w panelu zarządzania kontem. To tu możesz dostosować
                ustawienia swojego konta oraz uzyskać dostęp do dodatkowych
                funkcji.
            </p>
            <div className="grid gap-6 lg:gap-12">
                <EditUser />

                <SettingWrapper
                    title="Hasło"
                    desc="Zaktualizuj swoje hasło, aby zapewnić bezpieczeństwo
                    Twojego konta."
                    action={
                        <Link href="/konto/zmien_haslo" className="btn">
                            Zmień hasło
                        </Link>
                    }
                />

                <SettingWrapper
                    title="Zapisane wydarzenia"
                    desc="Przejdź do kalendarza, aby przeglądać zapisane
                    wydarzenia."
                    action={
                        <Link href="/kalendarz" className="btn">
                            Pokaż kalendarz
                        </Link>
                    }
                />

                <OnlyForOrganizers>
                    <div className="divider"></div>

                    <SettingWrapper
                        title="Dane organizatora"
                        desc="Edytuj informacje organizatorskie, takie jak dane kontaktowe, opis czy numer konta bankowego do rozliczeń"
                        action={
                            <Link
                                href="/konto/dane_organizatorskie"
                                className="btn"
                            >
                                Edytuj dane organizatorskie
                            </Link>
                        }
                    />

                    <SettingWrapper
                        title="Organizacja wydarzeń"
                        desc="Zarządzaj organizowanymi przez Ciebie wydarzeniami."
                        action={
                            <Link
                                href="/konto/edytuj_wydarzenia"
                                className="btn"
                            >
                                Przejdź do listy wydarzeń
                            </Link>
                        }
                    />
                </OnlyForOrganizers>

                <div className="divider"></div>

                <SettingWrapper
                    title="Prywatność i bezpieczeństwo"
                    desc="Zadbaj o ochronę swoich danych i przeczytaj naszą
                    politykę prywatności oraz zasady korzystania z serwisu."
                >
                    <div className="flex max-md:flex-col gap-2 gap-x-4 pt-2 lg:pt-3">
                        <Link
                            href="/prywatnosc"
                            className="link link-hover font-semibold"
                        >
                            Polityka prywatności
                        </Link>
                        <Link
                            href="/regulamin"
                            className="link link-hover font-semibold"
                        >
                            Regulamin serwisu
                        </Link>
                        <OnlyForOrganizers>
                            <Link
                                href="/wspolpraca"
                                className="link link-hover font-semibold"
                            >
                                Regulamin współpracy
                            </Link>
                        </OnlyForOrganizers>
                    </div>
                </SettingWrapper>

                <div className="divider"></div>

                <SettingWrapper
                    title="Usuwanie konta"
                    desc="Wszystkie informacje przypisane do tego konta zostaną trwale usuniętę."
                >
                    <DeleteUser />
                </SettingWrapper>
            </div>
        </main>
    );
}
