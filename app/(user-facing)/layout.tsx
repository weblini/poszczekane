import LoginWall from "@/app/_components/LoginWall/LoginWall";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { contactEmail } from "../_utils/metadata";
import InfoText from "../_components/InfoText";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return <LoginWall />;
    }

    return (
        <>
            {children}

            <div className="max-w-5xl w-full px-[5vw] mt-auto py-6 lg:py-12">
                <InfoText>
                Jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy,
                    skontaktuj się z naszym zespołem obsługi klienta pod adresem{" "}
                    <a
                        className="link link-hover font-semibold"
                        href={`mailto:${contactEmail}`}
                    >
                        {contactEmail}
                    </a>
                </InfoText>
            </div>
        </>
    );
}
