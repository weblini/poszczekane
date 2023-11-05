"use client";

import { useMemo, useState } from "react";
import { Marker } from "react-map-gl/maplibre";
import EventCard from "../_components/EventCard";
import BaseMap from "../_components/BaseMap";
import MapMarkerDiv from "../_components/MapMarkerDiv";

type Props = {
    events: (Partial<AppEvent> & {
        name: string;
        id: number;
        longitude: number;
        latitude: number;
    })[];
    mapKey: string;
};

export default function EventsMap({ events, mapKey }: Props) {
    if (!events?.length) {
        return null;
    }

    const [selected, setSelected] = useState<AppEvent["id"] | null>(null);

    const selectedEvent = events.find((event) => event.id == selected);

    const markers = useMemo(
        () =>
            events.map((event) => (
                <Marker
                    longitude={event.longitude}
                    latitude={event.latitude}
                    key={event.id}
                    offset={[0, -25]}
                >
                    <div
                        className="lg:tooltip tooltip-primary"
                        data-tip={event.name}
                    >
                        <svg height="50" viewBox="0 0 61 71" fill="none">
                            <g
                                className="cursor-pointer lg:tooltip lg:tooltip-primary"
                                onClick={() => setSelected(event.id)}
                                data-tip={event.name}
                            >
                                <path
                                    className="fill-primary stroke-white"
                                    d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z"
                                    strokeWidth="4"
                                />
                                <circle
                                    className={`transition-colors ${
                                        event.id === selected
                                            ? ""
                                            : "opacity-30"
                                    }`}
                                    cx="30.5"
                                    cy="30.5"
                                    r="8.5"
                                    fill="white"
                                />
                            </g>
                        </svg>
                    </div>
                </Marker>
            )),
        [setSelected, events, selected]
    );

    // ! manage clusters?
    // ! highlight selected and sync with side list

    return (
        <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 h-[400px] lg:h-full lg:rounded-box overflow-hidden">
                <BaseMap height="100%" mapKey={mapKey}>
                    {markers}
                </BaseMap>
            </div>

            <div className="lg:col-span-2 lg:h-[500px] px-[5vw] lg:p-0">
                {selectedEvent ? (
                    <EventCard event={selectedEvent} />
                ) : (
                    <MapMarkerDiv>
                        <p>
                            Kliknij na znacznik na mapie, aby dowiedzieć się
                            więcej o wybranym wydarzeniu.
                        </p>
                    </MapMarkerDiv>
                )}
            </div>
        </div>
    );
}
