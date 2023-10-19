import SignupForm from "@/app/_components/SignupForm";
import Link from "next/link";
import Image from "next/image";
import bgImg from "@/app/images/jointeam1.jpg";
import OnlyForUsers from "@/app/_components/OnlyForUsers";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

type Props = {};

export default async function Page({}: Props) {
    // handle check on BE

    // ! if already logged in but not organizer display different!
    // ! if already organizer ?

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
            redirect("/konto/dane_organizatorskie");
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
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl gap-6 lg:gap-12">
                <div className="text-center lg:text-left">
                    <h1 className="sr-only">
                        Zarejestruj się jako organizator
                    </h1>
                    <p className="text-5xl font-bold">Zostań organizatorem!</p>
                    <p className="py-4 lg:py-6">
                        Dołącz jako organizator i twórz niesamowite wydarzenia
                        dla miłośników psów i ich wiernych czworonogów.
                    </p>
                    <Link
                        href="/wspolpraca"
                        className="link link-hover text-sm block font-semibold py-1"
                    >
                        Zobacz dlaczego warto korzystać z serwisu jako
                        organizator.
                    </Link>
                    <Link
                        href="/jak_dodac_wydarzenie"
                        className="link link-hover text-sm block font-semibold py-1"
                    >
                        Zobacz jak dodać wydarzenie.
                    </Link>
                </div>

                {user ? (
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Nazwa
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="imie"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control pt-6">
                                <button className="btn btn-primary">
                                    Aktywuj konto organizatora
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <SignupForm />
                )}
            </div>
        </main>
    );
}
