import dynamic from "next/dynamic"
import Loader from "@/app/_components/Loader"
// import InfoText from "@/app/_components/InfoText"

// seperate calendar and render only client side
const Calendar = dynamic(
    () => import('./EventsCalendar'),
    {
        // @ts-ignore
        loading: Loader,
        ssr: false
    }
)


export default function Page() {

    return (
        <main className="wrapper w-full">
            {/* <InfoText>Tutaj znajdziesz wszystkie zapisane wydarzenia.</InfoText> */}
            <h1 className="title-base pb-1">Twój kalendarz</h1>
            {/* <p>Witaj w Twoim spersonalizowanym kalendarzu psich wydarzeń!</p> */}
            <p>To miejsce, gdzie Twoje plany z psem stają się rzeczywistością!</p>
            
            <Calendar />
        </main>
    )
}
