"use client";

import SubmitButton from "@/app/_components/form-components/SubmitButton";
import { signupUser } from "@/app/_utils/actions";
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import AlreadySignedupButton from "./AlreadySignedupButton";

const initialState = {
    message: null,
};

type Props = {
    eventId: number;
    wrapperClasses: string;
    btnText: string;
    topHint?: React.ReactNode;
    bottomHint?: React.ReactNode;
};

// ! show modal on click for not-logged in users, to help with seamless signups

export default function SignUpButton({
    eventId,
    wrapperClasses,
    topHint,
    bottomHint,
    btnText,
}: Props) {
    const [state, formAction] = useFormState(signupUser, initialState);

    // once it succeeds return a disabled button with the info
    if (state.message === "success") {
        return <AlreadySignedupButton className={wrapperClasses} />;
    }

    return (
        <form className={wrapperClasses} action={formAction}>
            <input hidden name="id" value={eventId} readOnly/>

            {topHint && <p className="text-sm pb-2">{topHint}</p>}
            <AddButton label={btnText} />
            {bottomHint && <p className="text-sm pb-2">{bottomHint}</p>}
        </form>
    );
}

type BtnProps = {
    label: string;
};

function AddButton({ label }: BtnProps) {
    const { pending } = useFormStatus();

    return <SubmitButton label={label} isLoading={pending} />;
}
