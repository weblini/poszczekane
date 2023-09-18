import Link from "next/link";

export default function NotFoundBase() {
	return (
		<main>
			<h1>Przepraszamy, <span>nie możemy znaleźć tej strony</span></h1>
			<p>Sprawdż czy wpisany adres jest prawidłowy lub przejdź do jednej z poniższych stron:</p>
			<Link className="btn btn-primary" href="/wydarzenia">Wszystkie wydarzenia</Link>
			<Link className="btn" href="/organizatorzy">Wszyscy organizatorzy</Link>
            <Link className="btn" href="/">Strona główna</Link>
		</main>
	)
}