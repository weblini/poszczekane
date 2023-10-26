import Link from "next/link";

type Props = { className: string };
export default function AlreadySignedupButton({ className }: Props) {
    return (
        <div className={className}>
            <span className="text-sm pb-2">Wydarzenie zapisane</span>
            <Link href="/kalendarz" className="btn btn-primary">
                Zobacz w kalendarzu
            </Link>
        </div>
    );
}
