"use client";

import SubmitButton from "@/app/_components/form-components/SubmitButton";
import { signupUser } from "@/app/_utils/actions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import OnlyForUsers from "@/app/_components/OnlyForUsers";
import { useRef } from "react";
import Link from "next/link";
import Modal from "@/app/_components/Modal";
import LoginForm from "@/app/_components/login-components/LoginForm";
import InfoText from "@/app/_components/InfoText";

const initialState = {
    message: "",
};

type Props = {
    eventId: number;
    wrapperClasses: string;
    btnText: string;
    topHint?: React.ReactNode;
    bottomHint?: React.ReactNode;
};

export default function SignUpButton({
    eventId,
    wrapperClasses,
    topHint,
    bottomHint,
    btnText,
}: Props) {
    const [state, formAction] = useFormState(signupUser, initialState);
    const loginModal = useRef<HTMLDialogElement | null>(null);

    return (
        <>
            <Modal ref={loginModal}>
                <h3 className="font-bold text-2xl">Zaloguj się</h3>
                <p className="py-4">
                    lub{" "}
                    <Link
                        href="/rejestracja"
                        className="link link-hover font-semibold"
                    >
                        stwórz nowe konto
                    </Link>
                </p>
                <LoginForm
                    className="flex flex-col gap-2 max-w-sm mx-auto"
                    onSuccess={() => loginModal.current?.close()}
                />
            </Modal>

            <form className={wrapperClasses} action={formAction}>
                {state?.message && (
                    <InfoText category="error" className="pb-2">{state?.message}</InfoText>
                )}
                <input hidden name="id" value={eventId} readOnly />

                {topHint && <p className="text-sm pb-2">{topHint}</p>}

                <OnlyForUsers
                    fallback={
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => loginModal.current?.showModal()}
                        >
                            {btnText}
                        </button>
                    }
                >
                    <AddButton label={btnText} />
                </OnlyForUsers>

                {bottomHint && <p className="text-sm pb-2">{bottomHint}</p>}
            </form>
        </>
    );
}

type BtnProps = {
    label: string;
};

function AddButton({ label }: BtnProps) {
    const { pending } = useFormStatus();

    return <SubmitButton label={label} isLoading={pending} />;
}
