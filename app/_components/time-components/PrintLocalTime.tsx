"use client";

import { timeFormatter } from "app/_utils/date-helper";

type Props = {
    isoString: string;
    withTime?: boolean;
};

export default function PrintLocalTime({ isoString, withTime }: Props) {
    const date = new Date(isoString);

    return <>{withTime && `${timeFormatter.format(date)} `}{date.toLocaleDateString()}</>;
}
