import Link from "next/link";

export default function NotFound() {

  return (
    <div>
        <h2>Przepraszamy, <span>nie możemy znaleźć tego wydarzenia</span></h2>
        <p>Sprawdź czy wpisany przez Ciebie adres jest prawidłowy</p>
        <p>lub przejdź do strony z aktualnymi wydarzeniami:</p>
        <Link className="btn" href="/wydarzenia">Wszyscy organizatorzy</Link>
    </div>
  )
}