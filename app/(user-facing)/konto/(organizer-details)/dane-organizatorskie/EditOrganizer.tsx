"use client";

import FailedUpdateText from "app/_components/FailedUpdateText";
import Input from "app/_components/form-components/Input";
import SubmitButton from "app/_components/form-components/SubmitButton";
import TextAreaInput from "app/_components/form-components/TextAreaInput";
import { updateOrganizer } from "app/_utils/actions";
import { OrgInfoSchema, toAccountNumber } from "app/_utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof OrgInfoSchema>;

type Props = {
    organizerInfo: Inputs;
};

export default function EditOrganizer({ organizerInfo }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [updateFailed, setUpdateFailed] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors },
    } = useForm({
        values: organizerInfo,
        resolver: zodResolver(OrgInfoSchema),
    });

    function abondonEdit() {
        setUpdateFailed(false);
        setEditMode(false);
        reset();
    }

    function normalizeAccountNumber(e: ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        setValue("account_number", toAccountNumber(value));
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await updateOrganizer(data);

        if (result.message === "failed") {
            setUpdateFailed(true);
        } else {
            abondonEdit();
        }
    };

    return (
        <>
            <div className="flex flex-col pt-2 md:pt-3">
                <button
                    className="btn md:ml-auto md:w-[200px]"
                    onClick={editMode ? abondonEdit : () => setEditMode(true)}
                >
                    {editMode ? "Porzuć edycję" : "Edytuj"}
                </button>
            </div>

            {updateFailed && !isSubmitting && <FailedUpdateText />}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-2 gap-x-4"
            >
                <Input
                    label="Nazwa"
                    disabled={!editMode}
                    register={register("name")}
                    error={errors.name?.message}
                />
                <Input
                    label="Email kontaktowy"
                    disabled={!editMode}
                    register={register("contact_email")}
                    error={errors.contact_email?.message}
                />
                <TextAreaInput
                    label="Opis"
                    disabled={!editMode}
                    register={register("description")}
                    error={errors.description?.message}
                    wrapperStyles="md:col-span-2"
                />
                <Input
                    label="Numer konta"
                    disabled={!editMode}
                    register={register("account_number")}
                    onChange={normalizeAccountNumber}
                    error={errors.account_number?.message}
                    wrapperStyles="md:col-span-2"
                />

                {editMode && (
                    <div className="pt-2 md:w-[200px] flex flex-col md:col-span-2 md:ml-auto">
                        <SubmitButton label="Zapisz" isLoading={isSubmitting} />
                    </div>
                )}
            </form>
        </>
    );
}
