import { CapapPointSchema } from "@/app/_utils/zod-schemas";
import { useState, useEffect, useRef, useCallback } from "react";
import { useWatch, useFormState, Control } from "react-hook-form";
import { GeoLocation, NewEventInputs } from "./AddEventForm";

type Props = {
    control: Control<NewEventInputs>;
    checkLocation: () => Promise<boolean>;
    updateGeoLocation: (point: GeoLocation) => void;
};



export function useLocationSearch({
    control,
    checkLocation,
    updateGeoLocation,
}: Props) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState("");

    const location = useWatch({
        control,
        name: "location",
        defaultValue: "",
    });

    const longitude = useWatch({
        control,
        name: "longitude",
        defaultValue: 0,
    });

    const latitude = useWatch({
        control,
        name: "latitude",
        defaultValue: 0,
    });

    const updatePin = useCallback(async () => {
        const locationValid = await checkLocation()

        if(!locationValid) {
            return
        }

        setIsUpdating(true);

        const capapResponse = await fetchCAPAP(location);

        if (!capapResponse || !capapResponse[0]) {
            setError(
                "Nie udało się ustalić lokalizacji. Spróbuj ponownie lub skontaktuj się z pomocą techniczną"
            );
            return;
        }

        setError("");

        // try to get exact result
        let geometry = capapResponse[0].single?.geometry;

        // check for alternate results
        if (capapResponse[0].others) {
            setError(
                "Znaleziono przybliżoną lokalizację. Podaj dokładniejszy adres."
            );
            geometry = capapResponse[0].others[0]?.geometry;
        }

        const parsingResult = CapapPointSchema.safeParse(geometry);

        if (!parsingResult.success) {
            setError(
                "Nie udało się ustalić lokalizacji. Upewnij się, że podany adres jest prawidłowy, spróbuj ponownie lub skontaktuj się z pomocą techniczną"
            );
        } else {
            updateGeoLocation({
                long: parsingResult.data.coordinates[0],
                lat: parsingResult.data.coordinates[1],
            });
        };

        setIsUpdating(false);
    }, [location])



    return { latitude, longitude, error, isUpdating, updatePin };
}


async function fetchCAPAP(query: string): Promise<any> {
    const body = JSON.stringify({
        reqs: [{ q: query }],
        useExtServiceIfNotFound: false,
    });

    // try to fetch location from CAPAP
    const response = await fetch(
        "https://capap.gugik.gov.pl/api/fts/gc/pkt",
        {
            method: "POST",
            cache: "force-cache",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: body,
        }
    );

    return response.json();
}