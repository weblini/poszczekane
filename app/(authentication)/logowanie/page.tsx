import LoginWall from "@/app/_components/login-components/LoginWall";
import { createClient } from "@/app/_utils/supabase/server";
import { redirect } from "next/navigation";

type Props = {};

export default async function Page({}: Props) {
    // redirect logged in user to calendar
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/kalendarz");
    }

    return <LoginWall />;
}
