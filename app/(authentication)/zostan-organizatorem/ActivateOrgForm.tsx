"use client";

import InfoDiv from "app/_components/InfoDiv";
import SubmitButton from "app/_components/form-components/SubmitButton";
import { upgradeToOrganizer } from "app/_utils/actions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

const initialState = {
    message: null,
};

function Button() {
    const { pending } = useFormStatus();

    return (
        <SubmitButton label="Aktywuj konto organizatora" isLoading={pending} />
    );
}

function ErrorBox({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();

    return (
        <InfoDiv category="error" isUpdating={pending}>
            {children}
        </InfoDiv>
    );
}

export default function ActivateOrgForm() {
    const [state, formAction] = useFormState(upgradeToOrganizer, initialState);

    if (state.message === "success") {
        return (
            <div className="card-body gap-0">
                <p className="title-base">
                    Twoje konto uzyskało status organizatora.
                </p>
                <p className="py-6">
                    Otrzymasz powiadomienie, gdy Twoje konto zostanie
                    zatwierdzone przez administratora.
                </p>
                <p className="text-sm">
                    Postaramy się, aby ten proces przebiegł jak najszybciej.
                </p>
            </div>
        );
    }

    return (
        <form className="card-body" action={formAction}>
            {state.message && (
                <ErrorBox>
                    <p className="text-sm">
                        Nie udało się aktywować konta
                        organizatora.
                    </p>
                    <p className="font-semibold">{state.message}</p>
                </ErrorBox>
            )}

            <p>
                Podaj swoje imię lub nazwę, pod którą będziesz tworzyć
                wydarzenia:
            </p>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Nazwa</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="np. Psiantastyczne Imprezy"
                    className="input input-bordered"
                />
            </div>

            <div className="form-control pt-4">
                <Button />
            </div>
        </form>
    );
}
