import BecomeOrganizer from "@/app/_components/BecomeOrganizer"
import { metaTitle } from "@/app/_utils/metadata"
import { supabaseAnon } from "@/app/_utils/supabase-clients"
import Link from "next/link"

export const metadata = {
    title: metaTitle("Organizatorzy"),
    description: 'Przeglądaj wszystkich organizatorów',
}

export default async function Page() {

    const { data: organizers } = await supabaseAnon.from('organizers').select()

    return (
        <>
            <main className="w-full">
                <div className="hero bg-base-200 w-full wrapper">
                    <div className="hero-content text-center">
                        <div className="max-w-xl">
                            <h1 className="text-4xl md:text-5xl font-extrabold pb-8 lg:pb-10">Nasi organizatorzy</h1>
                            <p>Tu znajdziesz listę organizatorów, którzy tworzą wyjątkowe wydarzenia dla miłośników psów i ich czworonożnych przyjaciół.</p>
                        </div>
                    </div>
                </div>

                <div className="wrapper">
                    <p className="py-6">Kliknij na profil organizatora, aby dowiedzieć się więcej o jego specjalizacji, doświadczeniu oraz wydarzeniach, które prowadzi.</p>
                    <ul className="grid lg:grid-cols-3 gap-4">
                        {organizers?.map(organizer => (
                            <li key={organizer.slug}>
                                <Link href={`/organizatorzy/${organizer.slug}`}>
                                    <div className="card bg-base-100 shadow">
                                        <div className='card-body'>
                                            <h3 className='card-title'>{organizer.name}</h3>
                                            <p>{organizer.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <BecomeOrganizer />
        </>
    )
}
