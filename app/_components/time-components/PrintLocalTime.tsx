"use client";

type Props = {
    isoString: string;
    withTime?: boolean;
};

export default function PrintLocalTime({ isoString, withTime }: Props) {
    const date = new Date(isoString);

    return <span>{withTime ? date.toLocaleString() : date.toLocaleDateString()}</span>;
}
