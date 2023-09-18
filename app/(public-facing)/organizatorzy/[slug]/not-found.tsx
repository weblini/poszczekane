import Link from "next/link";

export default function NotFound() {

  return (
    <div>
        <h2>Przepraszamy, <span>nie możemy znaleźć tego organizatora</span></h2>
        <p>Możesz przejść do strony z aktywnymi organizatorami:</p>
        <Link className="btn" href="/organizatorzy">Wszyscy organizatorzy</Link>
    </div>
  )
}