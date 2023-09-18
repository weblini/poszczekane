import Link from "next/link"

type Props = {}


export default function BecomeOrganizer({ }: Props) {

    return (
        <section className="wrapper text-center lg:text-left">

            <h2 className="title-ghost pb-2">Zostań organizatorem</h2>
            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow items-center">

                    <p>Jeśli jesteś organizatorem i chcesz dołączyć do naszej społeczności, zapoznaj się z <Link href='/wspolpraca' className="link link-hover font-semibold">warunkami współpracy</Link>, aby dowiedzieć się jak możemy Ci pomóc w promocji Twoich wydarzeń.</p>
                </div>
                <div className="divider lg:divider-horizontal" />
                <div className="grid flex-grow items-center">
                    <p className="title-base pb-2">Dołącz do nas!</p>
                    <p className="pb-3">Razem tworzymy wyjątkowe chwile i wspieramy rozwój psów i ich opiekunów.</p>
                    <Link href='/zostan_organizatorem' className="btn btn-primary">Zostań organizatorem</Link>
                </div>
            </div>

        </section>)
}