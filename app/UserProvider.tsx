"use client";

import { useState, useEffect, createContext } from "react";
import { createClient } from "./_utils/supabase/client";

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
    const supabase = createClient();

    const [userId, setUserId] = useState<UserDetails["userId"]>(null);
    const [isOrganizer, setIsOrganizer] = useState(false);

    useEffect(() => {
        async function checkForOrganizer(userId: string) {
            const { data: organizer } = await supabase
                .from("organizers")
                .select("user_id")
                .eq("user_id", userId)
                .maybeSingle();
            setIsOrganizer(organizer ? true : false);
        }

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                if(userId !== session.user.id) {
                    setUserId(session.user.id);
                    checkForOrganizer(session.user.id);
                }
            } else {
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
