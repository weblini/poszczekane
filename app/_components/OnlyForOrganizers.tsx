"use client";

import { useContext } from "react";
import { UserContext } from "../UserProvider";

type Props = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    matchingId: string | null;
};

export default function OnlyForOrganizers({ children, fallback, matchingId }: Props) {
    const userDetails = useContext(UserContext);

    if (!userDetails.isOrganizer || (matchingId && userDetails.userId !== matchingId)) {
        if (fallback) {
            return fallback;
        } else {
            return null;
        }
    }

    return children;
}
