"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function AccountBreadcrumb() {
    const segments = useSelectedLayoutSegments();

    if (!segments.length) {
        return (
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <h1>Twoje konto</h1>
                    </li>
                </ul>
            </div>
        );
    }

    const pageTitle = (segments[1].charAt(0).toUpperCase() + segments[1].slice(1)).replace("_", " ");

    return (
        <div className="text-sm breadcrumbs">
            <ul>
                <li>
                    <Link href="/konto">Twoje konto</Link>
                </li>
                <li>
                    <h1>{pageTitle}</h1>
                </li>
            </ul>
        </div>
    );
}
