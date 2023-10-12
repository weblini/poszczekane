import Link from "next/link"
import Image from 'next/image'
import img from '../images/join1.jpg'


export default function HowToStart() {
    return (
        <section className="wrapper relative">
            <Image
                alt=""
                src={img}
                placeholder="blur"
                quality={80}
                fill
                sizes="100vw"
                className='object-cover -z-10'
            />
            <h2 className="title-ghost pb-4">Jak zacząć?</h2>
            <ol className="grid grid-cols-4 lg:grid-cols-9 gap-6">
                <StepView title='Przeglądaj wydarzenia'>
                    <p>Sprawdź ofertę <Link href='/wydarzenia' className="link link-hover font-semibold">nadchodzących wydarzeń</Link>. Znajdziesz wśród nich szkolenia, wystawy i wiele innych.</p>
                </StepView>

                <StepView title='Zapisz się' className="col-start-2 row-start-2 lg:col-start-3">
                    <p>Kliknij na interesujące Cię wydarzenie i zapisz się. Zrobisz to szybko i wygodnie!</p>
                </StepView>

                <StepView title='Stwórz kalendarz marzeń' className="row-start-3 lg:col-start-5">
                    <p>Dodaj pierwsze wydarzenie i zobacz, jak <Link href='/kalendarz' className="link link-hover font-semibold">Twój kalendarz</Link> zaczyna wypełniać się ekscytującymi przygodami.</p>
                </StepView>

                <StepView title='Dowiedz się więcej' className="row-start-4 col-start-2 lg:row-start-2 lg:col-start-7">
                    <p>Chcesz poznać więcej szczegółów? Kliknij na wydarzenie, aby dowiedzieć się, co czeka Ciebie i Twojego psa.</p>
                </StepView>

            </ol>
        </section>
    )
}

type Props = {
    title: string,
    children: React.ReactNode,
    className?: string
}


function StepView({ title, children, className ='' }: Props) {

    return (
        <li className={`rounded-box shadow glass border-none relative [counter-increment:step] max-w-md overflow-hidden col-span-3 ${className}`}>
            <span className="bg-neutral/20 text-base-100 absolute h-12 w-12 rounded-bl-box before:content-[counter(step)] before:font-extrabold before:text-2xl md:before:text-3xl flex items-center justify-center top-0 right-0"></span>
            <div className="p-6 text-sm md:text-base">
                <h3 className="title-base pb-2 pr-6">{title}</h3>
                <div className="text-base-content/80">{children}</div>
            </div>
        </li>
    )
}