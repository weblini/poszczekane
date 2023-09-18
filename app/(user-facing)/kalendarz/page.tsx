import dynamic from "next/dynamic"
import Loader from "@/app/_components/Loader"

// seperate calendar and render only client side
const Calendar = dynamic(
    () => import('./EventsCalendar'),
    {
        loading: Loader,
        ssr: false
    }
)


export default function Page() {

    return (
        <main>
            <h1>Twój kalendarz</h1>
            <p>Witaj w Twoim spersonalizowanym kalendarzu psich wydarzeń!</p>
            <p>Tutaj znajdziesz wszystkie zapisane wydarzenia. To miejsce, gdzie Twoje plany z psem stają się rzeczywistością.</p>
            
            <Calendar />
        </main>
    )
}
