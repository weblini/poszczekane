import type { Database as DB } from "@/app/_types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

declare global {
    type SupaClient = SupabaseClient<DB>;
    type Database = DB;
    type Organizer = DB['public']['Tables']['organizers']['Row'];
    type Tag = DB['public']['Tables']['tags']['Row'];
    type AppEvent = DB['public']['Tables']['events']['Row'] & {tags?: Partial<Tag>[] | null} & {organizers?: Partial<Organizer> | null};
    type PartialAppEvent = Partial<AppEvent> & {name: string, id: number}
    type GeoPoint = [number, number];
    type UserInfo = Partial<DB['public']['Tables']['user_profiles']['Row']>;
}
