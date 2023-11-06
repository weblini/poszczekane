import { supabaseAdmin } from "app/_utils/supabase-clients";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import EditOrganizer from "./EditOrganizer";

export default async function Page() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw "No user detected";
    }

    const { data: publicData } = await supabase
        .from("organizers")
        .select("name, description, contact_email, id")
        .eq("id", user.id)
        .maybeSingle();

    if (!publicData) {
        throw "Failed to fetch organizer data";
    }

    const { data: privateData } = await supabaseAdmin
        .from("organizers_protected")
        .select("id, account_number")
        .eq("id", user.id)
        .maybeSingle();

    return (
        <>
            <p className="pb-2 md:pb-3">
                Witaj w panelu edycji danych organizatora. Tutaj możesz
                zarządzać i aktualizować swoje informacje jako organizator
                wydarzeń na naszej platformie.
            </p>

            <EditOrganizer
                organizerInfo={{
                    name: publicData.name,
                    description: publicData.description || "",
                    contact_email: publicData.contact_email || "",
                    account_number: privateData?.account_number || "",
                }}
            />
        </>
    );
}
