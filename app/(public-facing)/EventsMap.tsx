"use client";

import { useCallback } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import EventCard from "../_components/EventCard";
import MapMarkerDiv from "../_components/MapMarkerDiv";
import type { LayerProps } from "react-map-gl/maplibre";
import MapControls from "../_components/MapControls";
import { baseMapProps, mapStyle } from "../_utils/map-data";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";

import pinImg from "@/app/images/pin.png";
import { useEventMap } from "./useEventMap";

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
    const { sourceData, mapRef, mapProps, selectedEvents } = useEventMap({
        events,
    });
    // const mapRef = useRef<MapRef>(null);

    // const [selected, setSelected] = useState<number[]>([]);
    // const [cursor, setCursor] = useState<string>("auto");

    // const selectedEvents = events.filter((event) =>
    //     selected.includes(event.id)
    // );

    const onLoad = useCallback(() => {
        mapRef.current?.loadImage(pinImg.src, (error, img) => {
            if (img) {
                mapRef.current?.addImage("pin", img);
            }
        });
    }, []);

    // const onMouseEnter = useCallback(() => setCursor("pointer"), []);
    // const onMouseLeave = useCallback(() => setCursor("auto"), []);

    // const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    //     if (event.features?.length) {
    //         const feature = event.features[0];
    //         if (!feature) {
    //             return;
    //         }

    //         const source = mapRef.current?.getSource("events") as GeoJSONSource;

    //         // get all features from cluster
    //         if (feature.properties.cluster_id) {
    //             source.getClusterLeaves(
    //                 feature.properties.cluster_id,
    //                 10,
    //                 0,
    //                 (error, features) => {
    //                     if (!features) {
    //                         return;
    //                     }

    //                     let selectedIds = [];
    //                     for (const nestedFeature of features) {
    //                         selectedIds.push(
    //                             nestedFeature.properties?.event_id
    //                         );
    //                     }

    //                     setSelected(selectedIds.filter((id) => id));
    //                 }
    //             );
    //         } else {
    //             if (feature.properties.event_id) {
    //                 setSelected([feature.properties.event_id]);
    //             }
    //         }
    //     }
    // }, []);

    // const geojson = useMemo(
    //     () => ({
    //         type: "FeatureCollection",
    //         features: events.map((event) => ({
    //             type: "Feature",
    //             properties: { event_id: event.id },
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: [event.longitude, event.latitude],
    //             },
    //         })),
    //     }),
    //     [events]
    // );

    return (
        <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 h-[400px] lg:h-full lg:rounded-box overflow-hidden">
                <Map
                    {...baseMapProps}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle={`${mapStyle}${mapKey}`}
                    interactiveLayerIds={["clusters", "markers"]}
                    ref={mapRef}
                    onLoad={onLoad}
                    {...mapProps}
                >
                    <Source
                        id="events"
                        type="geojson"
                        data={sourceData}
                        cluster={true}
                        // clusterMaxZoom={9}
                        clusterRadius={40}
                    >
                        <Layer {...clusterLayer} />
                        <Layer {...clusterCountLayer} />
                        <Layer {...unclusteredMarkerLayer} />
                    </Source>
                    <MapControls />
                </Map>
            </div>
            <div className="lg:col-span-2 lg:h-[500px] px-[5vw] lg:p-0 lg:overflow-auto">
                {selectedEvents.length ? (
                    <div className="flex flex-col gap-4 pb-4">
                        {selectedEvents.map((event) => (
                            <EventCard event={event} key={event.id} />
                        ))}
                    </div>
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

const clusterLayer: LayerProps = {
    id: "clusters",
    type: "circle",
    source: "events",
    filter: ["has", "point_count"],
    paint: {
        "circle-color": "#ffb238",
        "circle-radius": 25,
    },
};

const clusterCountLayer: LayerProps = {
    id: "cluster-count",
    type: "symbol",
    source: "events",
    filter: ["has", "point_count"],
    paint: {
        "text-color": "#ffffff",
    },
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["Noto Sans Bold"],
        "text-size": 16,
    },
};

const unclusteredMarkerLayer: LayerProps = {
    id: "markers",
    type: "symbol",
    source: "events",
    filter: ["!", ["has", "point_count"]],
    layout: {
        "icon-image": "pin",
        "icon-anchor": "bottom",
        "icon-size": 0.75,
        "icon-allow-overlap": true,
    },
};
