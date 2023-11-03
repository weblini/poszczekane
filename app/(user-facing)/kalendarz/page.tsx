import dynamic from "next/dynamic";
import Loader from "@/app/_components/Loader";
// import InfoText from "@/app/_components/InfoText"

// seperate calendar and render only client side
const Calendar = dynamic(() => import("./EventsCalendar"), {
    loading: () => <Loader />,
    ssr: false,
});

export default function Page() {
    return (
        <main className="wrapper w-full">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <h1>Twój kalendarz</h1>
                    </li>
                </ul>
            </div>
            <p>
                To miejsce, gdzie Twoje plany z psem stają się rzeczywistością!
            </p>

            <Calendar />
        </main>
    );
}
