"use client";

import Map, { NavigationControl, useControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MaptilerLogoControl } from "@maptiler/sdk";

type Props = {
    children: React.ReactNode;
    height?: string | number;
};

const mapTilerMapId = "30d1bbf8-6e86-4004-96db-52701a6efe5d";

// GeoPoint is [longitude, latitude], same as CAPAP
const plCenter: GeoPoint = [19.424, 52.114];

export default function BaseMap({ children, height = 400 }: Props) {
    return (
        <Map
            initialViewState={{
                longitude: plCenter[0],
                latitude: plCenter[1],
                zoom: 4.8,
            }}
            style={{ width: "100%", height: height }}
            mapStyle={`https://api.maptiler.com/maps/${mapTilerMapId}/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
            minZoom={4}
            maxPitch={0}
            touchPitch={false}
            dragRotate={false}
        >
            {children}
            <DrawControl/>
            <NavigationControl visualizePitch={false} showCompass={false} />
        </Map>
    );
}

function DrawControl() {
    useControl(() => new MaptilerLogoControl(), {
        position: "bottom-left",
    });

    return null;
}
