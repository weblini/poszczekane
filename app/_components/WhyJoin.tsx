import Image, { StaticImageData } from 'next/image'
import friendsImg from '../images/friends1.jpg'
import memoriesImg from '../images/memories3.jpg'
import skillsImg from '../images/skills1.jpg'
import Link from 'next/link'


export default function WhyJoin() {

    return (
        <section className="wrapper">
            <h2 className="title-ghost text-center">Dlaczego warto do nas dołączyć?</h2>
            <ul className="grid gap-x-4 lg:grid-cols-3">
                <WhyCard
                    title='Nowe przyjaźnie'
                    imgFile={friendsImg}
                    imgAlt="Two happy dog friends running at the viewer"
                >
                    <p>Poznasz innych miłośników psów, którzy podzielają Twoje zainteresowania i pasje.</p>
                </WhyCard>

                <WhyCard
                    title='Rozwój i nowe umiejętności'
                    imgFile={skillsImg}
                    imgAlt="Two happy dog friends running at the viewer"
                >
                    <p>Wydarzenia oferują wiele możliwości nauki i doskonalenia umiejętności Twojego psa.</p>
                </WhyCard>

                <WhyCard
                    title='Niesamowite wspomnienia'
                    imgFile={memoriesImg}
                    imgAlt="Two happy dog friends running at the viewer"
                >
                    <p>Każde wydarzenie to niepowtarzalna szansa na przeżycie wspaniałych chwil z Twoim wiernym przyjacielem.</p>
                </WhyCard>
            </ul>
            <div className="chat chat-start place-items-center">
                <div className="chat-bubble chat-bubble-accent py-4">
                    <p className='title-base'>Nie czekaj!</p>
                    <p className='text-sm'><Link href='/wydarzenia' className="link link-hover font-semibold">Zapisz się na pierwsze wydarzenie</Link> i rozpocznij Waszą przygodę.</p>
                    <p className='text-sm'>Twój pies już nie może się doczekać nowych atrakcji!</p>
                </div>
            </div>
        </section>
    )
}



type Props = {
    title: string,
    children: React.ReactNode,
    imgFile: StaticImageData,
    imgAlt?: string,
}


function WhyCard({ title, children, imgFile, imgAlt = '' }: Props) {
    return (
        <li className="card">
            <div className="card-body p-6 items-center text-center">
                <Image
                    alt={imgAlt}
                    src={imgFile}
                    placeholder="blur"
                    quality={80}
                    className='mask mask-squircle max-w-xs'
                />
                <h3 className="title-base pt-4">{title}</h3>
                {children}
            </div>
        </li>
    )
}