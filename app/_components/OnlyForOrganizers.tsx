"use client";

import { useContext } from "react";
import { UserContext } from "../UserProvider";

type Props = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export default function OnlyForOrganizers({ children, fallback }: Props) {
    const userDetails = useContext(UserContext);

    if (!userDetails.isOrganizer) {
        if (fallback) {
            return fallback;
        } else {
            return null;
        }
    }

    return children;
}
