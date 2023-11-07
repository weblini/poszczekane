"use client";

import { formatEventDate } from "@/app/_utils/date-helper";

type Props = {
    startStamp: string;
    endStamp?: string;
};

export default function PrintSimpleDuration({ startStamp, endStamp }: Props) {
    return (
        <span aria-label="Data wydarzenia" suppressHydrationWarning>
            {formatEventDate(startStamp, endStamp)}
        </span>
    );
}
