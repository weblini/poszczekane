import Link from "next/link";
import { supabaseAnon } from "../_utils/supabase-clients";
import { getTagParams } from "../_utils/url-query";

type Props = {};
export default async function TagLinks({}: Props) {
    const { data: tags } = await supabaseAnon.from("tags").select("name");

    return (
        <>
            {tags?.map((tag) => (
                <Link
                    href={`/wydarzenia?${getTagParams([tag.name]).toString()}`}
                    className="badge hover:bg-accent border-none"
                    key={tag.name}
                >
                    {tag.name}
                </Link>
            ))}
        </>
    );
}
