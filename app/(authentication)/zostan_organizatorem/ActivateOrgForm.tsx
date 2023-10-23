"use client";

import { useState } from "react";

export default function ActivateOrgForm() {
    const [isDone, setIsDone] = useState(false)

    // ! server action
    // ! show response msg
    // ! show loading state
    // ! needs to check if there isn't already one with this name, but postgreSQL I think handles this?

    // 
    if (isDone) {
        <div className="card-body">
            <p>Twoje konto musi teraz zostać zaakceptowane przez administratora.</p>
        </div>
    }

    return (
        <form className="card-body">
            <p className="title-base">Podaj swoje imię lub nazwę, pod którą będziesz tworzyć wydarzenia</p>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Nazwa</span>
                </label>
                <input
                    type="text"
                    name="imie"
                    placeholder="np. Super Organizator"
                    className="input input-bordered"
                />
            </div>
            <div className="form-control pt-4">
                <button className="btn btn-primary">
                    Aktywuj konto organizatora
                </button>
            </div>
        </form>
    );
}
