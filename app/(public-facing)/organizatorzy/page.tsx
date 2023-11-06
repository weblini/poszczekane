import BecomeOrganizer from "@/app/_components/BecomeOrganizer";
import { metaTitle } from "@/app/_utils/metadata";
import { Suspense } from "react";
import OrganizerList from "./OrganizerList";
import Loader from "@/app/_components/Loader";
import Image from "next/image";
import bgImg from "@/app/images/organizers1.jpg";
import InfoText from "@/app/_components/InfoText";

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
                    <InfoText className="pb-6">
                    Kliknij na profil organizatora, aby dowiedzieć się
                        więcej o jego specjalizacji, doświadczeniu oraz
                        wydarzeniach, które prowadzi.
                    </InfoText>
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
