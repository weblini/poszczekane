"use client";

import InfoDiv from "@/app/_components/InfoDiv";
import Loader from "@/app/_components/Loader";
import Input from "@/app/_components/form-components/Input";
import SubmitButton from "@/app/_components/form-components/SubmitButton";
import TextAreaInput from "@/app/_components/form-components/TextAreaInput";
import { addEvent } from "@/app/_utils/actions";
import { NewEventSchema } from "@/app/_utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
    tags: Tag[];
};

export type GeoLocation = {
    long: number;
    lat: number;
};

export type NewEventInputs = z.infer<typeof NewEventSchema>;

const initalData = {
    max_attendees: 1,
    tags: [],
};

// seperate event map
const ClientOnlyLocationPicker = dynamic(() => import("./LocationPicker"), {
    loading: () => <Loader wrapperClasses="h-[400px]" />,
    ssr: false,
});

export default function AddEventForm({ tags }: Props) {
    const [response, setResponse] = useState("");

    const {
        register,
        reset,
        trigger,
        handleSubmit,
        setValue,
        control,
        formState: { isSubmitting, errors },
    } = useForm<NewEventInputs>({
        defaultValues: initalData,
        resolver: zodResolver(NewEventSchema),
    });

    const onSubmit: SubmitHandler<NewEventInputs> = async (data) => {
        const result = await addEvent(data);

        setResponse(result.message);
        reset();
    };

    const updateGeoLocation = ({ long, lat }: GeoLocation) => {
        setValue("longitude", long);
        setValue("latitude", lat);
    };


    return (
        <form
            className="flex gap-8 lg:gap-16 flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            {!isSubmitting &&
                response &&
                (response === "success" ? (
                    <InfoDiv category="confirm">
                        <p className="title-base">
                            Twoje wydarzenie zostało dodane!
                        </p>
                    </InfoDiv>
                ) : (
                    <InfoDiv category="error">
                        <p className="title-base">
                            Przepraszamy, wystąpił błąd:
                        </p>{" "}
                        <p>{response}</p>
                    </InfoDiv>
                ))}

            <div>
                <h2 className="title-base">Wypełnij podstawowe informacje</h2>
                <div className="grid gap-2 md:grid-cols-2 gap-x-4">
                    <Input
                        label="Nazwa wydarzenia"
                        placeholder="np. VI Piknik Miłośników Psów"
                        register={register("name")}
                        error={errors.name?.message}
                    />
                    <Input
                        label="Termin rozpoczęcia"
                        type="datetime-local"
                        register={register("starts")}
                        error={errors.starts?.message}
                    />
                    <Input
                        label="Termin zakończenia"
                        type="datetime-local"
                        register={register("ends")}
                        error={errors.ends?.message}
                    />
                    <Input
                        label="Termin zamknięcia zapisów"
                        type="datetime-local"
                        register={register("signupsClose")}
                        error={errors.signupsClose?.message}
                    />
                </div>
            </div>

            <div>
                <h2 className="title-base">
                    Określ liczbę uczestników i wysokość opłaty
                </h2>
                <p>
                    Podaj maksymalną liczbę uczestników i wysokość opłaty za
                    uczestnictwo, aby uczestnicy mogli się wygodnie
                    zarejestrować i zapłacić online.
                </p>
                <div className="grid md:grid-cols-2 gap-2 gap-x-4">
                    <Input label="Koszt" />
                    <Input
                        label="Liczba miejsc"
                        type="number"
                        register={register("max_attendees")}
                        error={errors.max_attendees?.message}
                    />
                </div>
            </div>

            <div>
                <h2 className="title-base">Określ lokalizację</h2>

                <div className="grid lg:grid-cols-2 gap-2 gap-x-4">
                    <ClientOnlyLocationPicker
                        control={control}
                        updateGeoLocation={updateGeoLocation}
                        checkLocation={() => trigger('location')}
                    >
                        <p>
                            Wprowadź adres miejsca, w którym odbędzie się
                            wydarzenie.
                        </p>
                        <Input
                            label="Adres"
                            placeholder="np. ul. Wielkiej Łapy 10, Psiakowo"
                            register={register("location")}
                            error={errors.location?.message}
                        />
                        <a
                            href="https://capap.gugik.gov.pl/"
                            className="link link-hovers text-sm"
                        >
                            Wyszukiwanie dzięki usłudze CAPAP
                        </a>
                    </ClientOnlyLocationPicker>
                </div>
            </div>

            <div>
                <h2 className="title-base">Opisz wydarzenie</h2>
                <p>
                    Pamiętaj, że im bardziej szczegółowo opiszesz swoje
                    wydarzenie, tym bardziej przyciągniesz uwagę potencjalnych
                    uczestników.
                </p>
                <TextAreaInput
                    label="Opis"
                    register={register("description")}
                    error={errors.description?.message}
                />
            </div>

            <div>
                <h2 className="title-base">Wybierz tagi</h2>
                <p>
                    Wybierz tagi, które najlepiej opisują rodzaj Twojego
                    wydarzenia. To pomoże użytkownikom łatwiej je znaleźć.
                </p>
                <div className="flex flex-wrap gap-2 py-4">
                    {tags &&
                        tags.map((tag) => (
                            <input
                                className="btn"
                                type="checkbox"
                                value={tag.id}
                                aria-label={tag.name}
                                key={tag.id}
                                {...register("tags")}
                            />
                        ))}
                </div>
                {errors.tags?.message && (
                    <p className="text-error text-sm">{errors.tags?.message}</p>
                )}
            </div>

            <div className="flex flex-col md:max-w-[200px] md:ml-auto">
                <SubmitButton
                    label="Opublikuj wydarzenie"
                    isLoading={isSubmitting}
                />
            </div>
        </form>
    );
}
