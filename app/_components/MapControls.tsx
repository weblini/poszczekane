import { MaptilerLogoControl } from "@maptiler/sdk";
import { NavigationControl, useControl } from "react-map-gl/maplibre";

export default function MapControls() {
    return (
        <>
            <DrawControl />
            <NavigationControl visualizePitch={false} showCompass={false} />
        </>
    );
}

function DrawControl() {
    useControl(() => new MaptilerLogoControl(), {
        position: "bottom-left",
    });

    return null;
}
