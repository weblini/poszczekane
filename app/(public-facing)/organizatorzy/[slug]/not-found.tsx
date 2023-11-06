import Link from "next/link";
import Image from "next/image";
import bgImg from "app/images/notfound1.jpg";

export default function NotFound() {
    return (
        <main className="hero min-h-[calc(100vh-4rem)] relative w-full">
            <Image
                alt=""
                src={bgImg}
                placeholder="blur"
                quality={80}
                fill
                sizes="100vw"
                className="object-cover -z-10"
            />
            <div className="hero-content px-[5vw] py-12 gap-8 max-lg:items-end lg:justify-end w-full h-full">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 max-w-md">
                    <div className="card-body text-center gap-4">
                        <h1 className="text-2xl lg:text-3xl font-extrabold">
                            Przepraszamy, nie możemy znaleźć tego organizatora.
                        </h1>
                        <p>
                            Możesz przejść do strony ze wszystkimi aktywnymi
                            organizatorami
                        </p>
                        <Link className="btn btn-primary" href="/organizatorzy">
                            Wszyscy organizatorzy
                        </Link>
                        <p>
                            lub na{" "}
                            <Link
                                className="link link-hover font-semibold"
                                href="/"
                            >
                                stronę główną.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
