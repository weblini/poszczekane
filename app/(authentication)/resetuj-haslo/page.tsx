import Image from "next/image";
import bgImg from "app/images/recover1.jpg";
import RecoverPassForm from "./RecoverPassForm";

export default function Page() {
    return (
        <main className="hero min-h-[calc(100vh-4rem)] relative">
            <Image
                alt=""
                src={bgImg}
                placeholder="blur"
                quality={80}
                fill
                sizes="100vw"
                className="object-cover opacity-25 -z-10"
            />
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl gap-6 md:gap-12">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Chcesz zresetować hasło?
                    </h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <RecoverPassForm />
                </div>
            </div>
        </main>
    );
}
