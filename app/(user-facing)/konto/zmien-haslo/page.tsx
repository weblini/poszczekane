"use client";

import InfoDiv from "@/app/_components/InfoDiv";
import Input from "@/app/_components/form-components/Input";
import SubmitButton from "@/app/_components/form-components/SubmitButton";
import { createClient } from "@/app/_utils/supabase/client";
import { LoginDataSchema } from "@/app/_utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const PasswordSchema = LoginDataSchema.pick({ password: true })
    .extend({
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Hasło nie zgadza się",
        path: ["confirmPassword"],
    });

type Inputs = z.infer<typeof PasswordSchema>;

export default function page() {
    const supabase = createClient();

    const [hasUpdated, setHasUpdated] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(PasswordSchema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { error } = await supabase.auth.updateUser({
            password: data.password,
        });

        if (error) {
            throw error;
        }

        setHasUpdated(true);
        reset();
    };

    return (
        <>
            {hasUpdated && !isSubmitting && (
                <InfoDiv category="confirm">
                    <p>Twoje hasło zostało zmienione.</p>
                </InfoDiv>
            )}

            <p>
                Wprowadź nowe, silne hasło. Upewnij się, że jest ono trudne do
                odgadnięcia, a następnie wprowadź je drugi raz, aby uniknąć
                błędów.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm py-4 md:py-6 mx-auto"
            >
                <Input
                    label="Nowe hasło"
                    type="password"
                    error={errors.password?.message}
                    register={register("password")}
                />
                <Input
                    label="Powtórz nowe hasło"
                    type="password"
                    error={errors.confirmPassword?.message}
                    register={register("confirmPassword")}
                />
                <div className="flex pt-3 flex-col">
                    <SubmitButton
                        label="Zmień hasło"
                        isLoading={isSubmitting}
                    />
                </div>
            </form>

            <p>Pamiętaj, że silne hasło to klucz do ochrony Twoich danych.</p>
        </>
    );
}
