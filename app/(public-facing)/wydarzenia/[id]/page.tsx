import { supabaseAdmin } from "@/app/_utils/supabase-clients";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import SignUpButton from "./SignUpButton";
import Link from "next/link";
import { Suspense } from "react";
import SubmitButton from "@/app/_components/form-components/SubmitButton";
import { formatEventDate } from "@/app/_utils/date-helper";
import PrintLocalTime from "@/app/_components/time-components/PrintLocalTime";

type Props = {
    params: { id: string };
    searchParams: { shcode?: string };
};

// How to handle fetching and stuff?

export default async function Page({ params, searchParams }: Props) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: { user } } = await supabase.auth.getUser()

    let { data: event } = await supabase
        .from("events")
        .select("*, signups ( id ), organizers ( name, slug )")
        .eq("id", params.id)
        .maybeSingle();

    if (!event) {
        // user has no special link
        if (!searchParams.shcode) {
            notFound();
        }

        // try to find the event using admin
        const { data: privateEvent } = await supabaseAdmin
            .from("events")
            .select("*, signups ( id ), organizers ( name, slug )")
            .eq("id", params.id)
            .maybeSingle();

        // event doesn't exist
        if (!privateEvent) {
            notFound();
        }

        // special link is invalid
        if (!(searchParams.shcode === privateEvent.share_code)) {
            notFound();
        }

        event = privateEvent;
    }

    return (
        <>
            <main>
                {event.share_code && <p>To wydarzenie jest prywatne</p>}
                <h1>{event.name}</h1>
                {event.organizers && (
                    <p>
                        Organizator:{" "}
                        <Link href={`/organizatorzy/${event.organizers.slug}`}>
                            {event.organizers.name}
                        </Link>
                    </p>
                )}
                <p>{event.description}</p>
                <p>
                    Gotowi na przygodę? Zapisz się i weź udział w wyjątkowym
                    wydarzeniu. Czekamy na Ciebie i Twojego pupila!
                </p>

                <div className="card shadow-lg shadow-slate-700/10">
                    <div className="card-body">
                        <p>
                            {/* make sure this is client side localized! adjust according to interval */}
                            Termin:{" "}
                            {formatEventDate(event.starts_at, event.ends_at)}
                        </p>
                        <p>Miejsce: {event.location}</p>
                        <p>
                            Cena: {event.fee_pln ? event.fee_pln / 100 : 0} zł
                        </p>
                        <p>Termin rejestracji: <PrintLocalTime isoString={event.signups_end_at}/></p>
                        <div className="card-actions">
                            <Suspense fallback={<SubmitButton isLoading />}>
                                <SignUpButton
                                    isSignedUp={!!user && (event.signups.findIndex(signup => signup.id === user.id) !== -1)}
                                    eventId={params.id}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>
            <div>
                <p>
                    Jeśli masz pytania lub potrzebujesz dodatkowych informacji,
                    skontaktuj się bezpośrednio z organizatorem pod adresem{" "}
                    <a href={`mailto:`} className="link link-secondary">
                        mailorganizatora@gdzies.pl
                    </a>
                </p>
            </div>
        </>
    );
}
