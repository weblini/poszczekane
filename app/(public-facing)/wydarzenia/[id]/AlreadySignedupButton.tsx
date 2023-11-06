import InfoText from "@/app/_components/InfoText";
import Link from "next/link";

type Props = { className: string };
export default function AlreadySignedupButton({ className }: Props) {
    return (
        <div className={className}>
            <InfoText className="pb-2" category="confirm">Wydarzenie zapisane</InfoText>
            <Link href="/kalendarz" className="btn btn-primary">
                Zobacz w kalendarzu
            </Link>
        </div>
    );
}
