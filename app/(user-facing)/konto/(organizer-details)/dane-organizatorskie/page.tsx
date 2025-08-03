import { supabaseAdmin } from "@/app/_utils/supabase-clients";
import EditOrganizer from "./EditOrganizer";
import { createClient } from "@/app/_utils/supabase/server";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw "No user detected";
    }

    const { data: publicData } = await supabase
        .from("organizers")
        .select("name, description, slug, contact_email, user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (!publicData) {
        throw "Failed to fetch organizer data";
    }

    const { data: privateData } = await supabaseAdmin
        .from("organizers_protected")
        .select("account_number")
        .eq("organizer_slug", publicData.slug)
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
