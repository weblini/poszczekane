"use client";

import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import MapControls from "./MapControls";
import { baseMapProps, mapStyle } from "../_utils/map-data";

type Props = {
    children: React.ReactNode;
    height?: string | number;
    mapKey: string;
};


export default function BaseMap({ children, height = 400, mapKey }: Props) {
    return (
        <Map
            {...baseMapProps}
            style={{ width: "100%", height: height }}
            mapStyle={`${mapStyle}${mapKey}`}
        >
            {children}
            <MapControls/>
        </Map>
    );
}