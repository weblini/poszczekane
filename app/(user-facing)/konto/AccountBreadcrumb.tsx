"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function AccountBreadcrumb() {
    const segments = useSelectedLayoutSegments();

    const lastPart = segments.at(-1)

    if (!lastPart) {
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

    let pageTitle = ''

    if (lastPart === "zmien-haslo") {
        pageTitle = "Zmień hasło"
    } else {
        pageTitle = (lastPart.charAt(0).toUpperCase() + lastPart.slice(1)).replace("-", " ");
    }

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
