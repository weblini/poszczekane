"use client";

import InfoDiv from "@/app/_components/InfoDiv";
import Input from "@/app/_components/form-components/Input";
import SubmitButton from "@/app/_components/form-components/SubmitButton";
import { supportEmail } from "@/app/_utils/metadata";
import { EmailSchema } from "@/app/_utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof EmailSchema>;

export default function RecoverPassForm() {
    const [isSent, setIsSent] = useState(false);

    const supabase = createClientComponentClient();

    // ! add optional send passcode?

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(EmailSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await supabase.auth.resetPasswordForEmail(data.email, {
            redirectTo: `${location.origin}/auth/callback?next=/konto/zmien_haslo`,
        });

        setIsSent(true);
    };

    if (isSent) {
        return (
            <div className="card-body text-center gap-0">
                <p className="pb-6">
                    Teraz sprawdź swoją skrzynkę pocztową i kliknij{" "}
                    <span className="text-primary-focus font-semibold">
                        link do odzyskania konta
                    </span>
                    , który znajdziesz w mailu od nas.
                </p>

                <InfoDiv>
                    <p className="text-sm">
                        Jeśli nie otrzymałeś/aś maila z linkiem, skontaktuj się
                        z naszym zespołem pomocy technicznej pod adresem{" "}
                        <a
                            href={`mailto:${supportEmail}`}
                            className="link link-hover font-semibold"
                        >
                            {supportEmail}
                        </a>
                        .
                    </p>
                </InfoDiv>
            </div>
        );
    }

    return (
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <p className="title-base">
                Podaj email przypisany do Twojego konta
            </p>
            <Input
                label="Email"
                error={errors.email?.message}
                register={register("email")}
                placeholder="twójmail@poczta.pl"
            />
            <div className="form-control py-2 pt-6">
                <SubmitButton isLoading={isSubmitting} label="Wyślij link" />
            </div>
            <p className="text-sm">
                Otrzymasz link do strony, na której ustawisz nowe hasło
            </p>
        </form>
    );
}
