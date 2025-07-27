"use client";

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
import { createClient } from "@/app/_utils/supabase/client";

type Props = {
    className?: string;
    onSuccess?: () => void;
};

type Inputs = z.infer<typeof LoginDataSchema>;

export default function LoginForm({ className = "", onSuccess }: Props) {
    const router = useRouter();
    const supabase = createClient();

    const [authFailed, setAuthFailed] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
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
            if(onSuccess) {
                onSuccess();
            }
            router.refresh();
            reset();
        }
    };

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            {authFailed && (
                <InfoDiv category="error">
                    <p className="text-sm">
                        Niestety, podane dane logowania są błędne. Spróbuj
                        ponownie lub skorzystaj z{" "}
                        <Link
                            href="/resetuj-haslo"
                            className="link link-hover font-semibold"
                        >
                            opcji resetowania hasła
                        </Link>
                        .
                    </p>
                </InfoDiv>
            )}

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
                <SubmitButton isLoading={isSubmitting} label="Zaloguj się" />
            </div>

            <Link
                href="/resetuj-haslo"
                className="link link-hover text-xs self-end"
            >
                Nie pamiętasz hasła?
            </Link>
        </form>
    );
}
