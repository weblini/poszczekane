import EventSearchBar from "@/app/_components/EventSearchBar";
import { metaTitle } from "@/app/_utils/metadata";
import Image from "next/image";
import searchImg from "@/app/images/search1.jpg";
import FilteredEventsList from "./FilteredEventsList";
import { Suspense } from "react";
import Loader from "@/app/_components/Loader";
import FilterBarLoader from "./FilterBarLoader";
import FilterBar from "./FilterBar";

type Props = {
    searchParams: { tag?: SearchParam; data?: string };
};

type SearchParam = string | string[];

export const metadata = {
    title: metaTitle("Wydarzenia"),
    desciption:
        "Wybieraj spośród dziesiątek wydarzeń i doświadcz niezapomnianych chwil z Twoim pupilem. Niezależnie od tego, czy jesteś doświadczonym właścicielem psa czy dopiero zaczynasz swoją przygodę, nasza platforma ma coś dla każdego.",
};

export default function Page({ searchParams }: Props) {
    let tags: string[] = [];

    if (Array.isArray(searchParams.tag)) {
        tags = searchParams.tag;
    } else if (searchParams.tag) {
        tags = [searchParams.tag];
    }

    const pageKey = `tags=${tags.join(",")}&date=${searchParams.data || ""}`;

    return (
        <>
            <main className="w-full bg-base-300/20">
                <div className="px-[5vw] py-6 rounded-b-box shadow bg-base-100">
                    <Suspense fallback={<FilterBar allTags={[]} />}>
                        <FilterBarLoader />
                    </Suspense>
                </div>

                <div className="wrapper pt-10">
                    <h1 className="font-extrabold text-base-content/30 text-xl md:text-3xl">
                        Nadchodzące wydarzenia
                    </h1>
                    <p className="pb-6">
                        Przeglądaj wydarzenia, zapisuj się i ciesz się
                        wyjątkowym czasem spędzonym ze swoim wiernym
                        towarzyszem!
                    </p>
                    <Suspense
                        fallback={<Loader wrapperClasses="h-[180px] items-start" />}
                        key={pageKey}
                    >
                        <FilteredEventsList
                            tags={tags}
                            date={searchParams.data}
                        />
                    </Suspense>
                </div>
            </main>

            <div className="wrapper w-full text-center relative">
                <Image
                    alt=""
                    src={searchImg}
                    placeholder="blur"
                    quality={80}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-20 -z-10"
                />
                <h2>Nie możesz znaleźć tego, czego szukasz?</h2>
                <p className="font-extrabold text-xl md:text-3xl pb-4">
                    Spróbuj wyszukać wydarzenie po nazwie
                </p>
                <div className="max-w-xl mx-auto">
                    <EventSearchBar fieldId="last-chance-search" />
                </div>
            </div>
        </>
    );
}
