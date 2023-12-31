import SignupForm from "@/app/_components/SignupForm";
import Link from "next/link";
import Image from "next/image";
import bgImg from "@/app/images/jointeam1.jpg";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import ActivateOrgForm from "./ActivateOrgForm";

export default async function Page() {
    // check for logged in user
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // redirect if user is already organizer
    if (user) {
        const { data: organizer } = await supabase
            .from("organizers")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();
        if (organizer) {
            redirect("/konto/dane-organizatorskie");
        }
    }

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
            <div className="hero-content flex-col lg:flex-row-reverse gap-6 lg:gap-12">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Zostań organizatorem!
                    </h1>
                    <p className="py-4 lg:py-6">
                        Dołącz jako organizator i twórz niesamowite wydarzenia
                        dla miłośników psów i ich wiernych czworonogów.
                    </p>
                    <p>
                        <Link
                            href="/wspolpraca"
                            className="link link-hover text-sm font-semibold"
                        >
                            Zobacz dlaczego warto korzystać z serwisu jako
                            organizator.
                        </Link>
                    </p>
                    <p className="pt-2">
                        <Link
                            href="/jak-dodac-wydarzenie"
                            className="link link-hover text-sm font-semibold"
                        >
                            Zobacz jak dodać wydarzenie.
                        </Link>
                    </p>
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    {user ? <ActivateOrgForm /> : <SignupForm returnBack/>}
                </div>
            </div>
        </main>
    );
}
