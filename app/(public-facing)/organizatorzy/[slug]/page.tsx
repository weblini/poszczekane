import EventCard from "@/app/_components/EventCard";
import EventCardDisplay from "@/app/_components/EventCardDisplay";
import InfoDiv from "@/app/_components/InfoDiv";
import OnlyForOrganizers from "@/app/_components/OnlyForOrganizers";
import { supabaseAnon } from "@/app/_utils/supabase-clients";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
    const { data: organizer } = await supabaseAnon
        .from("organizers")
        .select("name, description, id, events (name, id, location, starts_at, ends_at, tags (name))")
        .eq("slug", params.slug)
        .maybeSingle();

    if (!organizer) {
        notFound();
    }

    return (
        <main className="wrapper w-full max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-extrabold">
                {organizer.name}
            </h1>

            <OnlyForOrganizers matchingId={organizer.id}>
                <Link href="/konto/dane-organizatorskie" className="btn btn-sm">
                    Edytuj dane
                </Link>
            </OnlyForOrganizers>

            <div className="pt-8 lg:pt-12">
                <h2 className="title-base pb-2">O organizatorze</h2>
                <p>{organizer.description}</p>
            </div>

            <div className="pt-8 lg:pt-12">
                <h2 className="pb-4">
                    Nadchodzące wydarzenia organizowane przez {organizer.name}:
                </h2>
                <div>
                    {organizer.events?.length ? (
                        <EventCardDisplay events={organizer.events} />
                    ) : (
                        <InfoDiv>
                            <p>
                                Ten organizator jeszcze nie opublikował wydarzeń
                            </p>
                        </InfoDiv>
                    )}
                </div>
            </div>

            {/* <div className="pt-8 lg:pt-12">
                <h2 className="title-base pb-2">Kontakt z organizatorem</h2>
                <p>
                    Jeśli masz pytania dotyczące wydarzeń organizowanych przez{" "}
                    {organizer.name}, skontaktuj się pod numerem 123, mailowo
                    pod adresem xxx lub odwiedź stronę internetową abc, aby
                    poznać więcej szczegółów.
                </p>
            </div> */}
        </main>
    );
}
