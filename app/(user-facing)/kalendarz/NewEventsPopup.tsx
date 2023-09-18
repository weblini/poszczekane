import Link from "next/link"
import { useRef, useEffect } from "react"

export default function NewEventsPopup() {

    const modalRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }, [])


    return (
        <dialog className="modal modal-bottom sm:modal-middle" ref={modalRef}>
            <div className="modal-box text-center">
                <h3 className="font-bold text-2xl">Wygląda na to, że nie masz zaplanowanych wydarzeń.</h3>
                <p className="py-4">To doskonała okazja, aby odkryć nowe możliwości i pasje wspólnie z Twoim pupilem!</p>
                <div className="modal-action justify-center">
                    <Link href='wydarzenia' className="btn btn-secondary">Sprawdź nadchodzące wydarzenia</Link>
                </div>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>zamknij</button>
            </form>
        </dialog>
    )
}