import PrintLocalTime from "@/app/_components/time-components/PrintLocalTime";
import Link from "next/link";
import AlreadySignedupButton from "./AlreadySignedupButton";
import SignUpButton from "./SignupButton";

type Props = {
    eventId: number;
    isExternal: boolean;
    freeSpots: number | null;
    isSignedUp: boolean;
    signupCloseDate: string | null;
    tags: { name: string }[];
    isCanceled: boolean;
};

export default async function InteractionButton({
    eventId,
    isExternal,
    freeSpots,
    isSignedUp,
    signupCloseDate,
    tags,
    isCanceled,
}: Props) {
    const wrapperClasses = "form-control w-full max-w-xs pt-4";

    if (isCanceled) {
        return (
            <div className={wrapperClasses}>
                <Link
                    href="/kalendarz"
                    className="btn pointer-events-none text-opacity-50 bg-neutral/20 border-none"
                    aria-disabled
                >
                    Odwołane
                </Link>
            </div>
        );
    }

    if (isSignedUp) {
        return <AlreadySignedupButton className={wrapperClasses} />;
    }

    // ! handle signup...

    if (isExternal) {
        return (
            <SignUpButton
                wrapperClasses={wrapperClasses}
                eventId={eventId}
                btnText="Dodaj do kalendarza"
            />
        );
    }

    if (
        signupCloseDate &&
        new Date(signupCloseDate) > new Date() &&
        freeSpots &&
        freeSpots > 0
    ) {
        return (
            <SignUpButton
                wrapperClasses={wrapperClasses}
                eventId={eventId}
                btnText="Zapisz się"
                bottomHint={
                    signupCloseDate && (
                        <>
                            Zapisy otwarte do{" "}
                            <PrintLocalTime
                                isoString={signupCloseDate}
                                withTime
                            />
                        </>
                    )
                }
                topHint={
                    freeSpots < 3
                        ? "Ostatnie wolne miejsca!"
                        : "Gotowi na przygodę?"
                }
            />
        );
    }

    const searchParams = new URLSearchParams(
        tags.map((tag) => ["tag", tag.name])
    );

    return (
        <div className={wrapperClasses}>
            <button
                className="btn pointer-events-none text-opacity-50 bg-neutral/20"
                aria-disabled
            >
                Rejestracja zamknięta
            </button>
            <Link
                href={`/wydarzenia?${searchParams.toString()}`}
                className="text-sm link link-hover font-semibold pt-2"
            >
                Przeglądaj podobne wydarzenia
            </Link>
        </div>
    );
}
