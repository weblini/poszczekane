import ActivateOrgForm from "@/app/(authentication)/zostan-organizatorem/ActivateOrgForm";
import { createClient } from "@/app/_utils/supabase/server";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if(!user) {
        throw "No user detected"
    }

    const { data: organizer } = await supabase
        .from("organizers")
        .select()
        .eq("id", user?.id)
        .maybeSingle();

    if (organizer) {
        return <>{children}</>;
    }

    return (
        <div>
            <h2>Zostań organizatorem, aby tworzyć nowe wydarzenia!</h2>
            <ActivateOrgForm />
        </div>
    );
}
