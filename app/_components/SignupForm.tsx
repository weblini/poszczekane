type Props = {}


export default function SignupForm({ }: Props) {

    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
                <p className="text-center title-base">Stwórz nowe konto</p>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="twójmail@poczta.pl" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hasło</span>
                    </label>
                    <input type="password" name="password" placeholder="Twoje_hasło_:)" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Potwierdź hasło</span>
                    </label>
                    <input type="password" name="password" placeholder="Twoje_hasło_:)" className="input input-bordered" />
                </div>
                <div className="form-control pt-6">
                    <button className="btn btn-primary">Zarejestruj się</button>
                </div>
            </form>
        </div>
    )
}