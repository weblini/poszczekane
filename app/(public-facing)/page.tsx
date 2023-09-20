import { supabaseAnon } from '@/app/_utils/supabase-clients'
import EventSearchBar from '../_components/EventSearchBar'
import MatchedEventsList from './MatchedEventsList'
import HowToStart from '../_components/HowToStart'
import WhyJoin from '../_components/WhyJoin'
import BecomeOrganizer from '../_components/BecomeOrganizer'
import dynamic from 'next/dynamic'
import Loader from '../_components/Loader'
import Image from 'next/image'
import heroImg from '../images/focus1.jpg'
import { metaTitle } from '../_utils/metadata'
import Link from 'next/link'
import { getTagParams } from '../_utils/url-query'

// lazy load event map
const LazyEventMap = dynamic(
    () => import('./EventsMap'),
    {
        loading: Loader
    }
)


export const metadata = {
    title: metaTitle("Najlepsze wydarzenia dla miłośników psów"),
    desciption: "Odkrywaj nowe możliwości, ucz się, baw się i rozwijaj razem z nami. Zaplanuj niezapomniane chwile ze swoim psem, wybierając spośród imponującej listy wydarzeń, takich jak szkolenia, zawody, wystawy i wiele innych."
}


export default async function Index() {

    // events to plot on map that are in the future and not cancelled
    const { data: geoEvents, error } = await supabaseAnon
        .from('events')
        .select('id, name, starts_at, ends_at, latitude, longitude, organizers ( name, slug ), tags ( name )')
        .neq('is_cancelled', true)
        .gte('starts_at', (new Date).toISOString())
        .limit(12)

    if (error) { throw error }

    // tags to filter events
    const { data: tags } = await supabaseAnon.from('tags').select('name')


    return (
        <main className="animate-in opacity-0 w-full">
            <div className="hero relative">
                <Image
                    alt=""
                    src={heroImg}
                    placeholder="blur"
                    quality={80}
                    fill
                    sizes="100vw"
                    className='object-cover opacity-20 -z-10'
                />
                <div className="hero-content text-center">
                    <div className="max-w-xl py-10 lg:py-20">
                        <h1 className="text-4xl md:text-5xl font-extrabold pb-8 lg:pb-10">Znajdź idealne wydarzenie dla Ciebie i Twojego psa!</h1>
                        <EventSearchBar fieldId='home-search-form' />
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {tags?.map(tag => (
                                <Link href={`/wydarzenia?${getTagParams([tag.name]).toString()}`} className='badge hover:bg-accent border-none' key={tag.name}>{tag.name}</Link>
                            ))}
                        </div>
                        <p className="hidden md:block pt-6 lg:pt-8 text-sm">Jeśli jesteś pasjonatem psiego sportu, entuzjastą wystaw psów, chcesz doskonalić umiejętności swojego pupila lub po prostu szukasz fajnej imprezy <span className="font-semibold block">– mamy coś specjalnie dla Ciebie.</span></p>
                    </div>
                </div>
            </div>

            <div className='grid lg:grid-cols-3 gap-6 gap-y-12 px-[5vw] py-12 md:py-24'>
                <MatchedEventsList title="Treningi i szkolenia" matchedTags={['szkolenie', 'trening']} >
                    <p>Doskonal siebie i swojego psa pod okiem ekspertów. Zapisz się na trening lub szkolenie, które pomoże Wam odkryć nowe umiejętności.</p>
                </MatchedEventsList>
                <MatchedEventsList title="Zawody" matchedTags={['zawody']} >
                    <p>Pokaż, jak zgrani jesteście ze swoim psem. Sprawdź nadchodzące zawody i zgłoś Was na emocjonującą rywalizację.</p>
                </MatchedEventsList>
                <MatchedEventsList title="Wystawy" matchedTags={['wystawa']} >
                    <p>Czy Twój pies ma to "coś", by zabłysnąć na ringu? Dowiedz się, gdzie i kiedy odbędą się nadchodzące wystawy.</p>
                </MatchedEventsList>
            </div>

            <section className='pb-12 md:pb-24'>
                <div className='px-[5vw] text-center lg:text-left pb-4 lg:pb-8'>
                    <h2 className='title-ghost'>Mapa <span className="hidden lg:inline">nadchodzących </span>wydarzeń</h2>
                    <p>Odkryj wydarzenia w swojej okolicy na interaktywnej mapie. Nie przegap szansy na wspaniałą przygodę z Twoim psem!</p>
                </div>
                <div className="lg:px-[5vw]">
                    <LazyEventMap events={geoEvents} />
                </div>
            </section>

            <HowToStart />

            <WhyJoin />

            <BecomeOrganizer />
        </main>
    )
}
