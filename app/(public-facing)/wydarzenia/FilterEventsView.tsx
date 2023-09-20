"use client";

import InputField from "@/app/_components/InputField";
import { getTagParams } from "@/app/_utils/url-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {
    allTags: Tag[] | null;
};

export default function FilterEventsView({ allTags }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //   match filter selection to searchParams
        setSelectedTags(searchParams.getAll("tag"));
    }, []);

    const searchURL = `/wydarzenia?${
        selectedTags.length ? getTagParams(selectedTags) : ""
    }`;

    function handleApplyFilters(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        router.push(searchURL);
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
        <div className="px-[5vw] py-6">
            <form onSubmit={handleApplyFilters}>
                <p className="text-error">
                    Make this a fixed round button at the bottom left corner on
                    mobile
                </p>
                <p>
                    Dzięki opcjom filtrowania, znajdziesz dokładnie to, czego
                    szukasz.
                </p>
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text">Wybierz tagi</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {allTags?.map((tag) => (
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
                        ))}
                    </div>
                </div>

                <div className="md:flex gap-4">
                    <InputField label="Województwo" name="wojewodztwo" />
                    <InputField
                        label="Najwcześniejszy termin"
                        name="od_daty"
                        type="date"
                    />
                </div>

                <div className="flex gap-4">
                    <button className="btn btn-secondary">
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Szukam
                            </>
                        ) : (
                            <>
                                <svg
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    className="fill-current"
                                >
                                    <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                </svg>
                                Pokaż pasujące
                            </>
                        )}
                    </button>
                    <Link href='/wydarzenia' className="btn btn-ghost">Wyłącz filtry</Link>
                </div>
            </form>
        </div>
    );
}
