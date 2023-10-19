import LoginWall from "@/app/_components/LoginWall";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {};

export default async function Page({}: Props) {
    // redirect logged in user to calendar
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/kalendarz");
    }

    return <LoginWall />;
}
