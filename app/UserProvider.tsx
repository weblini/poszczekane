"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect, createContext } from "react";

type UserDetails = {
    userId: string | null;
    isOrganizer: boolean;
};

export const UserContext = createContext<UserDetails>({
    userId: null,
    isOrganizer: false,
});

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClientComponentClient<Database>();

    const [userId, setUserId] = useState<UserDetails["userId"]>(null);
    const [isOrganizer, setIsOrganizer] = useState(false);

    useEffect(() => {
        async function checkForOrganizer(userId: string) {
            const { data: organizer } = await supabase
                .from("organizers")
                .select("id")
                .eq("id", userId)
                .maybeSingle();
            setIsOrganizer(organizer ? true : false);
        }

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
                if (session) {
                    setUserId(session.user.id);
                    // try to find organizer matching user.id
                    checkForOrganizer(session.user.id);
                }
            } else if (event === "SIGNED_OUT") {
                setUserId(null);
                setIsOrganizer(false);
            }
        });
        return () => {
            data.subscription.unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ userId, isOrganizer }}>
            {children}
        </UserContext.Provider>
    );
}
