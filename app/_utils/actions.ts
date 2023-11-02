"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EventSignupSchema, OrgInfoSchema, OrgNameSchema } from "./zod-schemas";
import { supabaseAdmin } from "./supabase-clients";
import { isDatePast } from "./date-helper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

function createSlug(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/ł/gi, "l") // replace ł with l (ł cannot be decomposed)
        .normalize("NFD") // decompose accented letters into base letters and acents
        .replace(/[^a-z0-9 ]/g, "") // remove all chars other than (base)letters, numbers and spaces
        .replace(/\s+/g, "-"); // change spaces to hyphens
}

export async function upgradeToOrganizer(prevState: any, formData: FormData) {
    const parsed = OrgNameSchema.parse({
        name: formData.get("name"),
    });

    const generatedSlug = createSlug(parsed.name);

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

    if (error?.code === "23505") {
        return { message: "Ta nazwa jest już zajęta." };
    }

    if (error) {
        return { message: "Wystąpił błąd" };
    }

    return { message: "success" };
}

export async function signupUser(prevState: any, formData: FormData) {
    const parsed = EventSignupSchema.parse({
        id: Number(formData.get("id")),
    });

    const supabase = createServerActionClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw "No user detected";
    }

    // get info about the event
    const { data: event, error: eventError } = await supabaseAdmin
        .from("events")
        .select(
            "id, external_url, fee_pln, max_attendees, signups ( id ), signups_end_at"
        )
        .eq("id", parsed.id)
        .maybeSingle();

    if (eventError || !event) {
        throw eventError || Error("Can't retrieve event details");
    }

    // signups closed
    if (event.signups_end_at && isDatePast(new Date(event.signups_end_at))) {
        return { message: "Zapisy zamknięte" };
    }

    // no spots available
    if (event.max_attendees && event.max_attendees <= event.signups.length) {
        return { message: "Brak wolnych miejsc" };
    }

    // requires fee and is not external
    if (!event.external_url && !!event.fee_pln) {
        // ! handle payment
        throw Error("Payed internal events are not yet supported");
    }

    // try to create signup
    const { data, error } = await supabaseAdmin
        .from("signups")
        .insert([
            {
                event_id: parsed.id,
                attendee_id: user.id,
            },
        ])
        .select();

    if (error?.code === "P0001") {
        return { message: "To wydarzenie jest już w Twoim kalendarzu" };
    }

    if (error) {
        return { message: "Coś poszło nie tak" };
    }

    // revalidatePath(`/wydarzenia/${parsed.id}`)

    return { message: "success" };
}

export async function deleteUser() {
    const supabase = createServerActionClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw "No user detected";
    }

    // try to delete the user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(user?.id);

    // console.log(error)

    // logout the user
    const { error: logoutError } = await supabase.auth.signOut();

    // console.log(logoutError)

    revalidatePath("/");
    redirect("/");
}

export async function updateOrganizer(formData: z.infer<typeof OrgInfoSchema>) {
    const supabase = createServerActionClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw "No user detected";
    }

    // parse formData
    const parsed = OrgInfoSchema.parse(formData);

    const newSlug = createSlug(parsed.name);

    // try to update organizers and organizers_protected

    const { error: publicError } = await supabaseAdmin
        .from("organizers")
        .update({
            name: parsed.name,
            slug: newSlug,
            description: parsed.description,
            contact_email: parsed.contact_email,
        })
        .eq("id", user.id)
        .select();

    if (publicError) {
        return {message: "failed"}
    }

    const { error: privateError } = await supabaseAdmin
        .from("organizers_protected")
        .upsert({ account_number: parsed.account_number, id: user.id })
        .select()

    if (privateError) {
        return {message: "failed"}
    }

    revalidatePath("/");

    return {message:"ok"}
}
