"use client";

import InfoText from "@/app/_components/InfoText";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {
    allTags: Tag[] | null;
};

export default function FilterBar({ allTags }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const todayDateString = new Date().toISOString().split("T")[0];

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState(todayDateString);

    useEffect(() => {
        // match filter selection to searchParams
        setSelectedTags(searchParams.getAll("tag"));

        const queryDate = searchParams.get("data");
        if (queryDate !== selectedDate) {
            setSelectedDate(queryDate || todayDateString);
        }
    }, [searchParams]);

    async function handleApplyFilters(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // create search params
        const newSearchParams = new URLSearchParams();

        selectedTags.forEach((tag) => {
            newSearchParams.append("tag", tag);
        });
        if (selectedDate !== todayDateString) {
            newSearchParams.append("data", selectedDate);
        }

        router.push(`/wydarzenia?${newSearchParams.toString()}`);
    }

    const updateTags = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedTags([...selectedTags, value]);
        } else {
            setSelectedTags(selectedTags.filter((tag) => tag !== value));
        }
    };

    return (
        <form onSubmit={handleApplyFilters}>
            <InfoText>
                Dzięki opcjom filtrowania, znajdziesz dokładnie to, czego
                szukasz:
            </InfoText>

            <div className="flex flex-wrap gap-2 py-4 pt-6 justify-center md:justify-normal">
                {allTags?.length ? (
                    allTags.map((tag) => (
                        <input
                            key={tag.id}
                            type="checkbox"
                            name="tag"
                            value={tag.name}
                            aria-label={tag.name}
                            className="btn font-normal rounded-full h-6 min-h-6"
                            checked={selectedTags?.includes(tag.name)}
                            onChange={updateTags}
                        />
                    ))
                ) : (
                    <span className="rounded-full h-6 bg-base-200 animate-pulse" />
                )}
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div className="form-control w-full md:w-fit">
                    <label className="label">
                        <span className="label-text">Termin</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        name="od_daty"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 justify-between md:justify-end grow">
                    <Link className="btn btn-ghost" href="/wydarzenia">
                        Wyłącz filtry
                    </Link>

                    <button className="btn btn-secondary">
                        <svg
                            height="24px"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        Pokaż pasujące
                    </button>
                </div>
            </div>
        </form>
    );
}
