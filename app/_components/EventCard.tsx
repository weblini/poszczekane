import Link from "next/link";
import { formatEventDate } from "../_utils/date-helper";
import PrintSimpleDuration from "./time-components/PrintSimpleDuration";

interface EventCardProps {
    event: Partial<AppEvent> & { name: string; id: number };
    children?: React.ReactNode;
    buttons?: React.ReactNode;
    extraClasses?: string;
}

export default function EventCard({
    event,
    children,
    buttons,
    extraClasses = "",
}: EventCardProps) {
    return (
        <div
            className={`card bg-base-100 shadow w-full relative ${extraClasses}`}
        >
            <div
                className={`card-body ${
                    event.is_cancelled ? "opacity-70" : ""
                }`}
            >
                {!!event.tags?.length && (
                    <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                            <span
                                className="badge badge-accent badge-sm"
                                key={tag.name}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                <Link
                    href={`/wydarzenia/${event.id}`}
                    className="card-title group title-base"
                >
                    {event.name}
                    <span className="ml-auto group-hover:translate-x-1 transition-transform">
                        <svg height="24px" viewBox="0 0 24 24">
                            <path d="M9.31 6.71c-.39.39-.39 1.02 0 1.41L13.19 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01z" />
                        </svg>
                    </span>
                </Link>

                {(event.starts_at || event.location) && (
                    <div className="flex flex-wrap gap-2 gap-x-4">
                        {event.starts_at && (
                            <p className="flex-grow-0 flex">
                                <svg
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    className="fill-base-content/80 pr-1"
                                >
                                    <path d="M16 13h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm0-10v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V3c0-.55-.45-1-1-1s-1 .45-1 1zm2 17H6c-.55 0-1-.45-1-1V9h14v10c0 .55-.45 1-1 1z" />
                                </svg>
                                <PrintSimpleDuration startStamp={event.starts_at} endStamp={event.ends_at} />
                            </p>
                        )}
                        {event.location && (
                            <p className="flex-grow-0 flex">
                                <svg
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    className="fill-base-content/80 pr-1"
                                >
                                    <path d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.18 2.45 6.92 7.34 11.23.38.33.95.33 1.33 0C17.55 17.12 20 13.38 20 10.2 20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                </svg>
                                <span aria-label="Miejsce">
                                    {event.location}
                                </span>
                            </p>
                        )}
                    </div>
                )}

                {children}

                {event.organizers && (
                    <p className="text-sm mt-auto grow-0">
                        Organizator:{" "}
                        <Link
                            href={`/organizatorzy/${event.organizers.slug}`}
                            className="link link-hover"
                        >
                            {event.organizers.name}
                        </Link>
                    </p>
                )}

                {buttons && (
                    <div className="card-actions justify-between">
                        {buttons}
                    </div>
                )}
            </div>
        </div>
    );
}
