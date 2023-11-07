import { useCallback, useMemo, useRef, useState } from "react";
import { GeoJSONSource, MapLayerMouseEvent, MapRef } from "react-map-gl/dist/esm/exports-maplibre";


type Props = {
    events: (Partial<AppEvent> & {
        name: string;
        id: number;
        longitude: number;
        latitude: number;
    })[];
}

export function useEventMap({events}: Props) {
    const mapRef = useRef<MapRef>(null);

    const [selected, setSelected] = useState<number[]>([]);
    const [cursor, setCursor] = useState<string>("auto");

    const selectedEvents = events.filter((event) =>
        selected.includes(event.id)
    );

    const onMouseEnter = useCallback(() => setCursor("pointer"), []);
    const onMouseLeave = useCallback(() => setCursor("auto"), []);

    const onClick = useCallback((event: MapLayerMouseEvent) => {
        if (event.features?.length) {
            const feature = event.features[0];
            if (!feature?.properties) {
                return;
            }

            const source = mapRef.current?.getSource("events") as GeoJSONSource;

            // get all features from cluster
            if (feature.properties.cluster_id) {
                source.getClusterLeaves(
                    feature.properties.cluster_id,
                    10,
                    0,
                    (error, features) => {
                        if (!features) {
                            return;
                        }

                        let selectedIds = [];
                        for (const nestedFeature of features) {
                            selectedIds.push(
                                nestedFeature.properties?.event_id
                            );
                        }

                        setSelected(selectedIds.filter((id) => id));
                    }
                );
            } else {
                if (feature.properties.event_id) {
                    setSelected([feature.properties.event_id]);
                }
            }
        }
    }, []);

    const geojson = useMemo(
        () => ({
            type: "FeatureCollection",
            features: events.map((event) => ({
                type: "Feature",
                properties: { event_id: event.id },
                geometry: {
                    type: "Point",
                    coordinates: [event.longitude, event.latitude],
                },
            })),
        }),
        [events]
    );

    return ({sourceData: geojson, mapRef, mapProps: {onClick, onMouseEnter, onMouseLeave, cursor}, selectedEvents})
  
}