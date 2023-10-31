import InfoText from "@/app/_components/InfoText";
import OnlyForOrganizers from "@/app/_components/OnlyForOrganizers";
import Link from "next/link";
import SettingWrapper from "./SettingWrapper";


export default function Page() {
    return (
        <main>
            <InfoText className="pb-6 lg:pb-12">
                Witaj w panelu zarządzania kontem. Tutaj możesz dostosować
                ustawienia swojego konta oraz uzyskać dostęp do dodatkowych
                funkcji.
            </InfoText>

            <div className="grid gap-6 lg:gap-8">
                <SettingWrapper
                    title="Dane"
                    desc="Edytuj swoje podstawowe informacje, takie jak imię,
                        nazwisko, adres e-mail i numer telefonu."
                    action={<button className="btn">Edytuj dane</button>}
                ></SettingWrapper>

                <OnlyForOrganizers>
                    <SettingWrapper
                        title="Dane organizatora"
                        desc="Edytuj informacje organizatorskie, takie jak dane kontaktowe, opis czy numer konta bankowego do rozliczeń"
                        action={<button className="btn">Edytuj dane</button>}
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

                <SettingWrapper
                    title="Hasło"
                    desc="Zaktualizuj swoje hasło, aby zapewnić bezpieczeństwo
                    Twojego konta."
                    action={<button className="btn">Zmień hasło</button>}
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

                <SettingWrapper
                    title="Prywatność i bezpieczeństwo"
                    desc="Zadbaj o ochronę swoich danych i przeczytaj naszą
                    politykę prywatności oraz zasady korzystania z serwisu."
                >
                    <div className="flex max-md:flex-col gap-2">
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

                <SettingWrapper
                    title="Usuwanie konta"
                    desc="Wszystkie informacje przypisane do tego konta zostaną trwale usuniętę."
                >
                    <div className="max-md:flex-col flex gap-2 md:gap-12 justify-between">
                        <div>
                            <p>
                                Pamiętaj, że usunięcie konta jest nieodwracalne.
                            </p>
                            <p>
                                Nie można usunąć konta, które ma przypisane
                                wydarzenia lub oczekuje na rozliczenie środków
                                płatniczych.
                            </p>
                        </div>

                        <button className="btn btn-link max-md:self-start md:shrink-0 text-base-content">
                            Usuń konto
                        </button>
                    </div>
                </SettingWrapper>
            </div>
        </main>
    );
}
