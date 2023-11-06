import { supabaseAdmin } from "@/app/_utils/supabase-clients";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import InfoText from "@/app/_components/InfoText";
import PrintDuration from "@/app/_components/time-components/PrintDuration";
import InteractionButton from "./InteractionButton";
import EventDescription from "./EventDescription";

type Props = {
    params: { id: string };
    searchParams: { shcode?: string };
};

export const dynamic = 'force-dynamic'

export default async function Page({ params, searchParams }: Props) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // try to get the event using admin
    const { data: event, error } = await supabaseAdmin
        .from("events")
        .select(
            "*, signups ( attendee_id ), organizers ( name, slug, id ), tags( name )"
        )
        .eq("id", params.id)
        .maybeSingle();

    if (!event) {
        if (error) {
            throw error;
        }
        notFound();
    }

    const isSignedUp = !!event.signups.find((signup) => signup.attendee_id === user?.id);
    const isOrganizer = event.organizers?.id === user?.id;

    //  handle private event check
    if (event.share_code) {
        // user has no special link or it doesn't match AND user is not signed up for this event nor its organizer
        if (
            searchParams.shcode !== event.share_code &&
            !isSignedUp &&
            !isOrganizer
        ) {
            notFound();
        }
    }

    return (
        <main className="wrapper w-full grid gap-8 lg:gap-12 md:grid-cols-[1fr_360px] max-w-7xl">
            <div>
                <div className="flex flex-wrap gap-2 pb-2">
                    {event.tags.map((tag) => (
                        <span className="badge badge-accent" key={tag.name}>
                            {tag.name}
                        </span>
                    ))}
                </div>

                <h1 className="font-extrabold text-3xl md:text-4xl">
                    {event.name}
                </h1>

                {event.organizers && !event.external_url && (
                    <p className="pt-2">
                        Organizator:{" "}
                        <Link
                            href={`/organizatorzy/${event.organizers.slug}`}
                            className="link link-hover font-semibold"
                        >
                            {event.organizers.name}
                        </Link>
                    </p>
                )}
            </div>
            
            <div
                className={`card shadow ${
                    event.is_cancelled ? "bg-error/10" : "bg-base-200/50"
                } max-w-sm justify-self-center w-full`}
            >
                <div className="card-body">
                    {event.share_code && (
                        <InfoText>To wydarzenie jest prywatne</InfoText>
                    )}

                    {event.is_cancelled && (
                        <InfoText category="error">
                            To wydarzenie zostało odwołane!
                        </InfoText>
                    )}

                    <EventDetail label="Termin:" dim={event.is_cancelled}>
                        <PrintDuration
                            startStamp={event.starts_at}
                            endStamp={event.ends_at}
                        />
                    </EventDetail>

                    <EventDetail label="Miejsce:" dim={event.is_cancelled}>
                        {event.location}
                    </EventDetail>

                    {!event.external_url && (
                        <EventDetail label="Koszt:" dim={event.is_cancelled}>
                            {event.fee_pln
                                ? `${event.fee_pln / 100} zł`
                                : "za darmo"}
                        </EventDetail>
                    )}

                    {event.external_url && (
                        <EventDetail label="Zapisy:" dim={event.is_cancelled}>
                            <Link
                                href={event.external_url}
                                className="link link-hover font-semibold"
                            >
                                Przejdź do oficjalnej strony
                            </Link>
                        </EventDetail>
                    )}

                    <InteractionButton
                        eventId={event.id}
                        isExternal={!!event.external_url}
                        freeSpots={
                            event.max_attendees
                                ? event.max_attendees - event.signups.length
                                : null
                        }
                        isSignedUp={isSignedUp}
                        signupCloseDate={event.signups_end_at}
                        tags={event.tags}
                        isCanceled={event.is_cancelled}
                    />
                </div>
            </div>

            <div className="md:col-span-2">
                <h2 className="title-base pb-2">Szczegóły</h2>
                {event.description && <EventDescription text={event.description} />}
            </div>
        </main>
    );
}


type DetailProp = {
    label: string;
    children: React.ReactNode;
    dim: boolean;
};

function EventDetail({ label, children, dim }: DetailProp) {
    return (
        <p
            className={`grid grid-cols-[65px_1fr] items-center ${
                dim ? "opacity-50" : ""
            }`}
        >
            <span className="text-sm">{label}</span>{" "}
            <span className="font-semibold">{children}</span>
        </p>
    );
}
