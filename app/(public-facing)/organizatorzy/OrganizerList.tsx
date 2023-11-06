import { supabaseAnon } from "@/app/_utils/supabase-clients";
import Link from "next/link";

type Props = {};

export default async function OrganizerList({}: Props) {
    const { data: organizers } = await supabaseAnon.from("organizers").select("name, slug");

    return (
        <>
            {organizers?.map((organizer) => (
                <li key={organizer.slug}>
                    <Link
                        href={`/organizatorzy/${organizer.slug}`}
                        className="card bg-base-100 shadow hover:shadow-lg transition-shadow group overflow-hidden"
                    >
                        <div className="card-body">
                            <h3 className="card-title">
                                {organizer.name}
                                <span className="ml-auto group-hover:translate-x-4 opacity-20 group-hover:opacity-100 transition-transform">
                                    <svg
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        className="fill-base-content"
                                    >
                                        <path d="M9.31 6.71c-.39.39-.39 1.02 0 1.41L13.19 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01z" />
                                    </svg>
                                </span>
                            </h3>
                        </div>
                    </Link>
                </li>
            ))}
        </>
    );
}
