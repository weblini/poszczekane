"use client";

import InfoDiv from "app/_components/InfoDiv";
import { deleteUser } from "app/_utils/actions";
import { useState } from "react";

const warningText = "Pamiętaj, że usunięcie konta jest nieodwracalne.";

export default function DeleteUser() {
    const [deleteMode, setDeleteMode] = useState(false);

    if (deleteMode) {
        return (
            <div className="pt-2 lg:pt-3">
                <InfoDiv category="error">
                    <div>
                        <p className="font-semibold">
                            Czy na pewno chcesz usunąć Twoje konto?
                        </p>
                        <p className="text-sm">{warningText}</p>
                        <div className="grid gap-2 md:grid-cols-2 gap-x-4 pt-2 md:pt-3">
                            <button
                                className="btn btn-link text-base-content w-full"
                                onClick={() => setDeleteMode(false)}
                            >
                                Anuluj
                            </button>

                            <form action={deleteUser}>
                                <button className="btn btn-error w-full">
                                    Usuń konto
                                </button>
                            </form>
                        </div>
                    </div>
                </InfoDiv>
            </div>
        );
    }

    return (
        <div className="max-md:flex-col flex gap-2 md:gap-12 justify-between pt-2 lg:pt-3">
            <div className="text-sm">
                <p>{warningText}</p>
                <p>
                    Nie można usunąć konta, które ma przypisane wydarzenia lub
                    oczekuje na rozliczenie środków płatniczych.
                </p>
            </div>

            <button
                className="btn btn-link max-md:self-center md:shrink-0 text-base-content"
                onClick={() => setDeleteMode(true)}
            >
                Usuń konto
            </button>
        </div>
    );
}
