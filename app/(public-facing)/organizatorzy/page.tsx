import BecomeOrganizer from "@/app/_components/BecomeOrganizer";
import { metaTitle } from "@/app/_utils/metadata";
import { Suspense } from "react";
import OrganizerList from "./OrganizerList";
import Loader from "@/app/_components/Loader";
import Image from "next/image";
import bgImg from "@/app/images/organizers1.jpg";

export const metadata = {
    title: metaTitle("Organizatorzy"),
    description: "Przeglądaj wszystkich organizatorów",
};

export default function Page() {
    return (
        <>
            <main className="w-full">
                <div className="hero relative">
                    <Image
                        alt=""
                        src={bgImg}
                        placeholder="blur"
                        quality={80}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-20 -z-10"
                    />
                    <div className="hero-content text-center wrapper">
                        <div className="max-w-xl">
                            <h1 className="text-4xl md:text-5xl font-extrabold pb-8 lg:pb-10">
                                Nasi organizatorzy
                            </h1>
                            <p>
                                Poznaj pasjonatów, którzy stoją za organizacją
                                niezapomnianych wydarzeń. To właśnie oni tworzą
                                wyjątkowe doświadczenia dla Ciebie i Twojego
                                czworonożnego przyjaciela.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="wrapper">
                    <p className="flex items-center text-sm gap-2 text-neutral pb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-neutral/50 w-6 h-6 shrink-0"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        Kliknij na profil organizatora, aby dowiedzieć się
                        więcej o jego specjalizacji, doświadczeniu oraz
                        wydarzeniach, które prowadzi.
                    </p>
                    <ul className="grid grid-flow-row grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 w-full">
                        <Suspense fallback={<Loader />}>
                            <OrganizerList />
                        </Suspense>
                    </ul>
                </div>
            </main>

            <BecomeOrganizer />
        </>
    );
}
