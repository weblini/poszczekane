"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { OrgNameSchema } from "./zod-schemas";
import { supabaseAdmin } from "./supabase-clients";

export async function upgradeToOrganizer(prevState: any, formData: FormData) {
    const parsed = OrgNameSchema.parse({
        name: formData.get("name"),
    });

    const generatedSlug = parsed.name
        .trim()
        .toLowerCase()
        .replace(/ł/gi, "l") // replace ł with l (ł cannot be decomposed)
        .normalize("NFD") // decompose accented letters into base letters and acents
        .replace(/[^a-z0-9 ]/g, "") // remove all chars other than (base)letters, numbers and spaces
        .replace(/\s+/g, "-"); // change spaces to hyphens

    const supabase = createServerActionClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw "No user detected";
    }

    // try to create organizer in supabase for user -> should fail if name or slug are not unique
    const { data, error } = await supabaseAdmin
        .from("organizers")
        .insert([
            {
                id: user.id,
                name: parsed.name,
                slug: generatedSlug,
                is_approved: false,
            },
        ])
        .select();

    if (error?.code === '23505') {
        return { message: "Ta nazwa jest już zajęta."}
    }

    if (error) {
        return { message: "Wystąpił błąd"}
    }

    return { message: "success" };
}
