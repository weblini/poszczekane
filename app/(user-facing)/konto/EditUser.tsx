"use client";

import { useState } from "react";
import SettingWrapper from "./SettingWrapper";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Input from "@/app/_components/form-components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import InfoText from "@/app/_components/InfoText";
import SubmitButton from "@/app/_components/form-components/SubmitButton";
import FailedUpdateText from "@/app/_components/FailedUpdateText";

type UserInfo = {
    name: string | null;
    last_name: string | null;
    phone: string | null;
};

export default function EditUser() {
    const supabase = createClientComponentClient<Database>();

    const [editMode, setEditMode] = useState(false);
    const [failed, setFailed] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<UserInfo>({ defaultValues: async () => getUserInfo() });

    async function getUserInfo() {
        const { data } = await supabase
            .from("user_profiles")
            .select("last_name, name, phone")
            .maybeSingle();

        return data || { name: "", last_name: "", phone: "" };
    }

    function abandonEdit() {
        setEditMode(false);
        reset();
    }

    const onSubmit: SubmitHandler<UserInfo> = async (data) => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            throw "No user found";
        }
        // try to update user_profiles
        const { data: updatedData, error } = await supabase
            .from("user_profiles")
            .upsert({ ...data, id: user.id })
            .select("last_name, name, phone")
            .maybeSingle();

        if (updatedData) {
            reset(updatedData);
        } else {
            reset();
            setFailed(true);
        }

        setEditMode(false);
    };

    function startEdit() {
        setEditMode(true);
        setFailed(false);
    }

    return (
        <SettingWrapper
            title="Dane"
            desc="Edytuj swoje podstawowe informacje, takie jak imię,
                        nazwisko, adres e-mail i numer telefonu."
            action={
                !editMode && (
                    <button className="btn" onClick={startEdit}>
                        Edytuj dane
                    </button>
                )
            }
        >
            {failed && (
                <FailedUpdateText />
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-2 gap-x-4"
            >
                <Input
                    label="Imię"
                    disabled={!editMode}
                    register={register("name")}
                />
                <Input
                    label="Nazwisko"
                    disabled={!editMode}
                    register={register("last_name")}
                />
                <Input
                    label="Numer kontaktowy"
                    disabled={!editMode}
                    register={register("phone")}
                />
                {editMode && (
                    <div className="grid max-md:pt-2 grid-cols-2 md:grid-cols-[auto_200px] gap-2 items-end">
                        <button
                            className="btn btn-link text-base-content"
                            type="button"
                            onClick={abandonEdit}
                        >
                            Porzuć edycję
                        </button>
                        <SubmitButton label="Zapisz" isLoading={isSubmitting}/>
                    </div>
                )}
            </form>
        </SettingWrapper>
    );
}
