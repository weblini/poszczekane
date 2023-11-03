"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import InfoDiv from "../InfoDiv";
import Input from "../form-components/Input";
import { LoginDataSchema } from "@/app/_utils/zod-schemas";
import SubmitButton from "../form-components/SubmitButton";


type Inputs = z.infer<typeof LoginDataSchema>;

export default function LoginForm() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [authFailed, setAuthFailed] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(LoginDataSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setAuthFailed(true);
        } else {
            router.refresh();
        }
    };

    return (
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {authFailed && <InfoDiv isError>
                <p className="text-sm">
                    Niestety, podane dane logowania są niepoprawne. Spróbuj
                    ponownie lub skorzystaj z{" "}
                    <Link
                        href="/resetuj_haslo"
                        className="link link-hover font-semibold"
                    >
                        opcji resetowania hasła
                    </Link>
                    .
                </p>
            </InfoDiv>}

            <Input
                label="Email"
                error={errors.email?.message}
                register={register("email")}
                placeholder="np. twójmail@poczta.pl"
            />
            <Input
                label="Hasło"
                error={errors.password?.message}
                register={register("password")}
                type="password"
                placeholder="np. Twoje_hasło_:)"
            />
            <div className="form-control py-2 pt-4">
                <SubmitButton isLoading={isSubmitting} label="Zaloguj się"/>
            </div>

            <Link
                href="/resetuj_haslo"
                className="link link-hover text-xs self-end"
            >
                Nie pamiętasz hasła?
            </Link>
        </form>
    );
}
