import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


export default async function Page() {

    const supabase = createServerComponentClient<Database>({ cookies })

    const { data: { user } } = await supabase.auth.getUser()

    const { data: userProfile } = await supabase.from('user_profiles').select().maybeSingle()

    return (
        <div>
            <h2>Twoje dane do szybkich zapisów na wydarzenia:</h2>
            <div className="card bg-base-100 shadow-lg shadow-slate-700/10">
                <div className="card-body">
                    <p>Hasło: zmien hasło</p>
                    <p>Email: {user?.email}</p>
                    <div>
                        {userProfile ?
                            <>
                                <div>
                                    <p>Imie: {userProfile.name || ""}</p>
                                    <p>Nazwisko: {userProfile.last_name || ""}</p>
                                    <p>Numer tel: {userProfile.phone || ""}</p>
                                </div>

                                <div>
                                    <h3>Dane do faktur</h3>
                                    <p>Nazwa firmy: {userProfile.company_name || ""}</p>
                                    <p>NIP: {userProfile.company_nip || ""}</p>
                                    <p>Ulica: {userProfile.company_street || ""}</p>
                                    <p>Kod pocztowy: {userProfile.company_postal_code || ""}</p>
                                    <p>Miejscowość: {userProfile.company_city || ""}</p>
                                </div>
                            </>
                            :
                            <>
                                <p>Nie masz jeszcze dodanych danych do szybkich zapisów</p>
                            </>
                        }
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">{userProfile ? "Edytuj dane" : "Dodaj dane"}</button>
                    </div>
                </div>
            </div>
            <div>Preferencje powiadomień?</div>
            <div>Twoje wydarzenia: liczba wydarzeń jako uczestnik/ jako organizator</div>
            <div>historia aktywności: ostatnie logowanie?</div>
            <div>zarządzaj kontem? : usuń / zostań organizatorem ?</div>
        </div>
    )
}
