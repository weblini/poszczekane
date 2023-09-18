'use client'

import { Dispatch, SetStateAction } from "react"
import { Marker } from 'react-map-gl/maplibre';
import BaseMap from "../BaseMap";

type Props = {
    location: string,
    geoPoint: GeoPoint | null,
    setGeoPoint: Dispatch<SetStateAction<GeoPoint | null>>
}


export default function LocationPicker({ location, geoPoint, setGeoPoint }: Props) {

    // ! Add error handling!
    async function fetchGeoCoding() {
        if (!location) {
            return
        }

        const body = JSON.stringify({
            reqs: [
                { q: location }
            ],
            useExtServiceIfNotFound: true
        })

        // try to fetch location from CAPAP
        const response = await fetch('https://capap.gugik.gov.pl/api/fts/gc/pkt', {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: body,
        });

        const result = await response.json();

        // update marker location
        const fetchedPoint = result[0]?.single?.geometry
        if (fetchedPoint?.type === "Point" && fetchedPoint.coordinates) {
            const newPoint = fetchedPoint.coordinates as GeoPoint
            setGeoPoint(newPoint)
        }
    }

    return (
        <div className="lg:grid lg:grid-cols-3 gap-4">
            <div>
                {!location && <p>Wpisz miejsce wydarzenia, aby odszukać je na mapie</p>}
                <button type="button" className="btn btn-primary" onClick={fetchGeoCoding} disabled={!location}>Znajdź na mapie</button>
                <p><a href="https://capap.gugik.gov.pl/" className="link link-hovers text-sm">Wyszukiwanie dzięki CAPAP</a></p>
                <p>Jeśli chcesz dostosować lokalizację swojego wydarzenia, użyj opcji przeciągnięcia pinezki na mapie. Po prostu złap pinezkę i przesuń ją na właściwe miejsce na mapie.</p>
            </div>

            <div className="lg:col-span-2 overflow-hidden rounded-box rounded-l-none">
                <BaseMap>
                    {geoPoint &&
                        <Marker 
                            longitude={geoPoint[0]} 
                            latitude={geoPoint[1]} 
                            offset={[0, -25]}
                            draggable
                            onDragEnd={(e) => setGeoPoint([e.lngLat.lng, e.lngLat.lat])} 
                        >
                            <svg height="50" viewBox="0 0 61 71" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z" fill="#93C0D0" stroke="white" strokeWidth="4"></path><circle cx="30.5" cy="30.5" r="8.5" fill="white" opacity="0.6"></circle></svg>
                        </Marker>
                    }
                </BaseMap>
            </div>

        </div>
    )
}