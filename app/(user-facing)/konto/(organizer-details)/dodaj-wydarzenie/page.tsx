import AddEventForm from "@/app/(user-facing)/konto/(organizer-details)/dodaj-wydarzenie/AddEventForm";
import InfoDiv from "@/app/_components/InfoDiv";
import { supabaseAnon } from "@/app/_utils/supabase-clients";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const { data: tags } = await supabaseAnon.from("tags").select();

    if (!tags?.length) {
        throw "Failed to get available tags";
    }

    // ! check if user has active account, if not show different screen

    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/");
    }

    const { data: organizer } = await supabase
        .from("organizers")
        .select("id, is_approved")
        .eq("id", user?.id)
        .maybeSingle();

    if (!organizer) {
        redirect("/");
    }

    if (!organizer.is_approved) {
        return (
            <InfoDiv category="confirm">
                <h2 className="title-base">
                    Twoje konto obecnie przechodzi proces zatwierdzania przez
                    administratora.
                </h2>
                <p>
                    Prosimy o cierpliwość. Nasz zespół dokłada wszelkich starań,
                    aby sprawdzić Twoje konto jak najszybciej. Gdy tylko
                    zostanie zatwierdzone, uzyskasz dostęp do publikacji nowych
                    wydarzeń.
                </p>
            </InfoDiv>
        );
    }

    return (
        <>
            <div className="flex pb-2">
                <Link
                    href="/konto/edytuj-wydarzenia"
                    className="btn max-sm:btn-ghost max-sm:text-right max-w-[200px] ml-auto"
                >
                    Pokaż opublikowane wydarzenia
                </Link>
            </div>
            <AddEventForm tags={tags} mapKey={process.env.NEXT_PUBLIC_MAPTILER_KEY || ""} />
        </>
    );
}
