"use client";

import Link from "next/link";
import SubmitButton from "./form-components/SubmitButton";
import { SignupDataSchema } from "../_utils/zod-schemas";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import InfoDiv from "./InfoDiv";
import Input from "./form-components/Input";
import { supportEmail } from "../_utils/metadata";
import { usePathname } from "next/navigation";

type Inputs = z.infer<typeof SignupDataSchema>;

type Props = {
    returnBack?: boolean
}

export default function SignupForm({returnBack}:Props) {
    const supabase = createClientComponentClient();
    const pathname = usePathname()

    const [isDone, setIsDone] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(SignupDataSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        let emailRedirectTo = `${location.origin}/auth/callback`
        if(returnBack) {
            emailRedirectTo += `?next=${pathname}`
        }

        await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                emailRedirectTo,
            },
        });

        setIsDone(true);
    };

    if (isDone) {
        return (
            <div className="card-body text-center gap-0">
                <p className="title-base">Gratulacje!</p>
                <p className="pb-6">
                    Teraz sprawdź swoją skrzynkę pocztową i kliknij{" "}
                    <span className="text-primary-focus font-semibold">
                        link aktywacyjny
                    </span>
                    , który znajdziesz w mailu z potwierdzeniem rejestracji.
                </p>

                <InfoDiv>
                    <p className="font-semibold">
                        Nie otrzymałeś/aś maila z potwierdzeniem rejestracji?
                    </p>
                    <p className="py-2 text-sm">
                        Jeśli masz już aktywne konto, przejdź do{" "}
                        <Link
                            href="/logowanie"
                            className="link link-hover font-semibold"
                        >
                            strony logowania.
                        </Link>
                    </p>
                    <p className="text-sm">
                        Jeśli nadal masz problemy, skontaktuj się z naszym
                        zespołem pomocy technicznej pod adresem{" "}
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
            <p className="text-center title-base">Stwórz nowe konto</p>
            <p className="text-sm">
                Lub przejdź do{" "}
                <Link
                    href="/logowanie"
                    className="link link-hover font-semibold"
                >
                    strony logowania
                </Link>
                , jeśli masz już konto w naszym serwisie.
            </p>

            <Input
                label="Email"
                error={errors.email?.message}
                register={register("email")}
                placeholder="twójmail@poczta.pl"
            />
            <Input
                label="Hasło"
                error={errors.password?.message}
                register={register("password")}
                type="password"
                placeholder="Twoje_hasło_:)"
            />
            <Input
                label="Potwierdź hasło"
                error={errors.confirmPassword?.message}
                register={register("confirmPassword")}
                type="password"
                placeholder="Twoje_hasło_:)"
            />

            <div className="form-control pt-4">
                <SubmitButton
                    isLoading={isSubmitting}
                    label="Zarejestruj się"
                />
            </div>
        </form>
    );
}
