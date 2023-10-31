import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ActivateOrgForm from "@/app/(authentication)/zostan_organizatorem/ActivateOrgForm";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });

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
