"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
    EventSignupSchema,
    NewEventSchema,
    OrgInfoSchema,
    OrgNameSchema,
} from "./zod-schemas";
import { supabaseAdmin } from "./supabase-clients";
import { isDatePast } from "./date-helper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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

    // no spots available and is not external
    if (!event.external_url && event.max_attendees && event.max_attendees <= event.signups.length) {
        return { message: "Brak wolnych miejsc" };
    }

    // requires fee and is not external
    if (!event.external_url && !!event.fee_pln) {
        // ! handle payment
        throw Error("Zapisy na płatne wydarzenia są aktualnie niedostępne");
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

    revalidatePath(`/wydarzenia/${parsed.id}`)
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
        return { message: "failed" };
    }

    const { error: privateError } = await supabaseAdmin
        .from("organizers_protected")
        .upsert({ account_number: parsed.account_number, id: user.id })
        .select();

    if (privateError) {
        return { message: "failed" };
    }

    revalidatePath("/");

    return { message: "ok" };
}

export async function addEvent(formData: z.infer<typeof NewEventSchema>) {
    const supabase = createServerActionClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { message: "Nie masz odpowiednich uprawnień." };
    }

    // ! check that user is organizer & is active
    const { data: organizer } = await supabase
        .from("organizers")
        .select("id, is_approved")
        .eq("id", user?.id)
        .maybeSingle();

    if (!organizer?.is_approved) {
        return { message: "Nie masz odpowiednich uprawnień." };
    }

    // parse formData
    const { tags, starts, ends, signupsClose, ...event } =
        NewEventSchema.parse(formData);

    const newEvent = {
        ...event,
        organizer_id: user.id,
        starts_at: starts.toISOString(),
        ends_at: ends.toISOString(),
        signups_end_at: signupsClose.toISOString(),
    };

    //  try to add the event
    const { data: createdEvent } = await supabaseAdmin
        .from("events")
        .insert([newEvent])
        .select()
        .maybeSingle();

    if (!createdEvent) {
        return { message: "Nie udało się dodać wydarzenia." };
    }

    // try to add tags
    const { error: tagError } = await supabaseAdmin
        .from("event_tags")
        .insert(
            tags.map((tag) => ({
                event_id: createdEvent.id,
                tag_id: tag,
            }))
        )
        .select();

    if (tagError) {
        const { error } = await supabaseAdmin
            .from("events")
            .delete()
            .eq("id", createdEvent.id);

        return { message: "Nie udało się dodać wydarzenia." };
    }

    return { message: "success" };
}

function createSlug(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/ł/gi, "l") // replace ł with l (ł cannot be decomposed)
        .normalize("NFD") // decompose accented letters into base letters and acents
        .replace(/[^a-z0-9 ]/g, "") // remove all chars other than (base)letters, numbers and spaces
        .replace(/\s+/g, "-"); // change spaces to hyphens
}
