import { CapapPointSchema } from "@/app/_utils/zod-schemas";
import { useState, useEffect } from "react";
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

    const { dirtyFields } = useFormState({
        control,
    });

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

    useEffect(() => {
        let dropPrevious = false;
        let timeoutId: NodeJS.Timeout | undefined;

        if (dirtyFields.location) {
            timeoutId = setTimeout(async () => {
                const locationValid = await checkLocation();

                if (locationValid && !dropPrevious) {
                    setIsUpdating(true);

                    const capapResponse = await fetchCAPAP(location);

                    if (!dropPrevious) {
                        parseLocation(capapResponse);
                    }

                    setIsUpdating(false);
                }
            }, 1600);
        }

        return () => {
            dropPrevious = true;
            clearTimeout(timeoutId);
        };
    }, [location, dirtyFields.location]);

    async function fetchCAPAP(query: string): Promise<unknown> {
        const body = JSON.stringify({
            reqs: [{ q: query }],
            useExtServiceIfNotFound: true,
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

    function parseLocation(capapResponse: any) {
        console.log({ capapResponse });

        if (!capapResponse || !capapResponse[0]) {
            setError(
                "Nie udało się ustalić lokalizacji. Spróbuj ponownie później lub skontaktuj się z pomocą techniczną"
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
                "Nie udało się ustalić lokalizacji. Upewnij się, że podany adres jest prawidłowy, spróbuj ponownie później lub skontaktuj się z pomocą techniczną"
            );
        } else {
            updateGeoLocation({
                long: parsingResult.data.coordinates[0],
                lat: parsingResult.data.coordinates[1],
            });
        }
    }

    return { latitude, longitude, error, isUpdating };
}
