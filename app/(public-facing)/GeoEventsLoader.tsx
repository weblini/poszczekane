import dynamic from "next/dynamic";
import { supabaseAnon } from "../_utils/supabase-clients";
import Loader from "../_components/Loader";

type Props = {};

// lazy load event map
const ClientOnlyMap = dynamic(() => import("./ClientOnlyEventMap"), {
    loading: () => <Loader />,
});

export const revalidate = 600

export default async function GeoEventsLoader({}: Props) {
    // events to plot on map that are in the future and not cancelled
    const { data: geoEvents, error } = await supabaseAnon
        .from("events")
        .select(
            "id, name, starts_at, ends_at, latitude, longitude, location, organizers ( name, slug ), tags ( name )"
        )
        .neq("is_cancelled", true)
        .gte("ends_at", new Date().toISOString())
        .order('starts_at', { ascending: true })
        .limit(12);

    // if (!geoEvents?.length) {
    //     return null;
    // }

    return (
        <ClientOnlyMap
            events={geoEvents || []}
            mapKey={process.env.NEXT_PUBLIC_MAPTILER_KEY || ""}
        />
    );
}
