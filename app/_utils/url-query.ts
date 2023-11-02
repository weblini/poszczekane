import { todayDateString } from "./date-helper";

export function getTagParams(tags: string[]) {
    const searchParams = new URLSearchParams();

    tags.forEach((tag) => {
        searchParams.append("tag", tag);
    });

    return searchParams;
}

export function getEventsUrl({
    tags,
    date,
    page,
}: {
    tags: string[];
    date?: string;
    page?: number;
}) {
    const newSearchParams = new URLSearchParams();

    tags.forEach((tag) => {
        newSearchParams.append("tag", tag);
    });
    
    if (date && date !== todayDateString) {
        newSearchParams.append("data", date);
    }

    if (page) {
        newSearchParams.append("strona", String(page));
    }

    return `/wydarzenia?${newSearchParams.toString()}`;
}
