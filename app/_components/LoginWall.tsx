import Link from "next/link"

type Props = {
    alternate?: React.ReactNode
}


export default function LoginWall({ alternate }: Props) {
    
    return (
        <main className="hero min-h-[calc(100vh-4rem)] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl lg:gap-8">
                <div className="text-center lg:text-left">
                    <h1 className="sr-only">Zaloguj się na konto</h1>
                    <p className="text-5xl font-bold">Miło Cię widzieć!</p>
                    <p className="py-6">Zaloguj się</p>
                    {alternate || <p className="text-sm">Lub <Link className="link link-hover font-semibold" href="/rejestracja">załóż konto</Link>, aby cieszyć się spersonalizowanymi treściami, zarządzać swoim kalendarzem i przeglądać zapisane wydarzenia.</p>}
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" placeholder="twójmail@poczta.pl" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Hasło</span>
                            </label>
                            <input type="password" name="password" placeholder="Twoje_haslo_:)" className="input input-bordered" />
                        </div>
                        <div className="form-control py-2">
                            <button className="btn btn-primary">Zaloguj się</button>
                        </div>
                        <Link href='/resetuj_haslo' className="link link-hover text-xs text-right">Nie pamiętasz hasła?</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}