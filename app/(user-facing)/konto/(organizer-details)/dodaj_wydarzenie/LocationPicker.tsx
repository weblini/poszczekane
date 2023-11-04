"use client";

import BaseMap from "@/app/_components/BaseMap";
import { useMemo } from "react";
import { Control} from "react-hook-form";
import { Marker } from "react-map-gl/maplibre";
import { NewEventInputs } from "./AddEventForm";
import type { GeoLocation } from "./AddEventForm";
import MapMarkerDiv from "@/app/_components/MapMarkerDiv";
import InfoText from "@/app/_components/InfoText";
import { useLocationSearch } from "./useLocationSearch";

type Props = {
    control: Control<NewEventInputs>;
    updateGeoLocation: (point: GeoLocation) => void;
    checkLocation: () => Promise<boolean>;
    children: React.ReactNode;
};

export default function LocationPicker({
    control,
    updateGeoLocation,
    checkLocation,
    children,
}: Props) {
   
    const {latitude, longitude, isUpdating, error} = useLocationSearch({control, updateGeoLocation, checkLocation})

    const marker = useMemo(() => {
        if (!latitude || !longitude) {
            return null;
        }
        return (
            <Marker
                longitude={longitude}
                latitude={latitude}
                offset={[0, -25]}
                draggable
                onDragEnd={(e) =>
                    updateGeoLocation({
                        long: e.lngLat.lng,
                        lat: e.lngLat.lat,
                    })
                }
            >
                <svg
                    height="50"
                    viewBox="0 0 61 71"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z"
                        className="fill-primary"
                        stroke="white"
                        strokeWidth="4"
                    ></path>
                    <circle
                        cx="30.5"
                        cy="30.5"
                        r="8.5"
                        fill="white"
                        opacity="0.6"
                    ></circle>
                </svg>
            </Marker>
        );
    }, [latitude, longitude]);

    return (
        <>
            <div className="flex flex-col gap-2">
                {children}

                {error && <InfoText isError>{error}</InfoText>}

                {!!latitude && !!longitude && (
                    <div className="p-4 mt-auto rounded-box bg-base-300/20 border border-base-200">
                        <MapMarkerDiv>
                            <p>
                                Jeśli chcesz dostosować dokładną lokalizację
                                swojego wydarzenia, złap pinezkę i przesuń ją na
                                właściwe miejsce na mapie.
                            </p>
                        </MapMarkerDiv>
                    </div>
                )}
            </div>
            <div
                className={`overflow-hidden rounded-box ${
                    isUpdating ? "animate-pulse" : ""
                }`}
            >
                <BaseMap>{marker}</BaseMap>
            </div>
        </>
    );
}
