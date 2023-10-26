import AddEventAction from "@/app/_components/AddEvent/AddEventAction";
import { contactEmail } from "@/app/_utils/metadata";


export default function Page() {

    return (
        <>
        <p className="text-red-700 font-extrabold">Musi mieć przynajmniej jeden tag!</p>
            <AddEventAction />
            <section>
                <h2>Masz pytania? Potrzebujesz pomocy?</h2>
                <p>Jeśli masz pytania lub potrzebujesz wsparcia przy tworzeniu wydarzenia, napisz do nas na adres <a href={`mailto:${contactEmail}`} className="link link-hover">{contactEmail}</a>.</p>
                <p>Mamy nadzieję, że organizacja wydarzeń z naszą pomocą będzie prosta i przyjemna.</p>
            </section>
        </>

    )
}