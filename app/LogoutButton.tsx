"use client";

import { useRouter } from "next/navigation";
import { createClient } from "./_utils/supabase/client";

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    async function signOut() {
        const { error } = await supabase.auth.signOut();

        // ! add message if got error
        if (error) {
            console.log(error);
        }

        if (!error) {
            router.refresh();
        }
    }

    return (
        <button className="btn max-lg:w-full" onClick={signOut}>
            Wyloguj
        </button>
    );
}
