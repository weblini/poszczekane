type Props = {}


export default function SignupForm({ }: Props) {

    return (
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Potwierdź hasło</span>
                    </label>
                    <input type="password" name="password" placeholder="Twoje_haslo_:)" className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Zarejestruj się</button>
                </div>
            </div>
        </div>
    )
}