"use client";

import { isDateBetween, timeFormatter } from "app/_utils/date-helper";

type Props = {
    startStamp: string;
    endStamp: string;
};

export default function PrintDuration({ startStamp, endStamp }: Props) {
    const startDate = new Date(startStamp);
    const endDate = new Date(endStamp);

    if (isDateBetween(endDate, startDate)) {
        return `${startDate.toLocaleDateString()}, ${timeFormatter.format(
            startDate
        )} - ${timeFormatter.format(endDate)}`;
    }

    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
}
