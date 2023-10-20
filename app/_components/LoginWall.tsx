import Link from "next/link";
import Image from "next/image";
import bgImg from "@/app/images/hello1.jpg";

export default function LoginWall() {
    // ! refresh current page after succesfull login
    // ! ServerAction this stuff?

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
                    <p className="text-4xl md:text-5xl font-bold">
                        Miło Cię widzieć!
                    </p>
                    <h1 className="py-4 md:py-6">Zaloguj się</h1>
                    <p className="text-sm">
                        Lub{" "}
                        <Link
                            className="link link-hover font-semibold"
                            href="/rejestracja"
                        >
                            załóż konto
                        </Link>
                        , aby cieszyć się spersonalizowanymi treściami,
                        zarządzać swoim kalendarzem i przeglądać zapisane
                        wydarzenia.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="twójmail@poczta.pl"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Hasło</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Twoje_hasło_:)"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control py-2 pt-6">
                            <button className="btn btn-primary">
                                Zaloguj się
                            </button>
                        </div>
                        <Link
                            href="/resetuj_haslo"
                            className="link link-hover text-xs text-right"
                        >
                            Nie pamiętasz hasła?
                        </Link>
                    </form>
                </div>
            </div>
        </main>
    );
}
