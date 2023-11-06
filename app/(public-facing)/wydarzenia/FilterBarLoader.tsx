import { supabaseAnon } from "app/_utils/supabase-clients";
import FilterBar from "./FilterBar";

export default async function FilterBarLoader() {

    // get available tags
    const { data: tags } = await supabaseAnon.from("tags").select();

  return (
    <FilterBar allTags={tags} />
  )
}