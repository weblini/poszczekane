import LoginWall from "@/app/_components/login-components/LoginWall";
import { contactEmail } from "../_utils/metadata";
import InfoText from "../_components/InfoText";
import OnlyForOrganizers from "../_components/OnlyForOrganizers";
import { createClient } from "../_utils/supabase/server";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

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
                <OnlyForOrganizers>
                    <div className="chat chat-start pb-4">
                        <p className="chat-bubble text-base-content/80 bg-base-300 font-semibold text-sm">
                            Dziękujemy za organizowanie wspaniałych wydarzeń
                            dla miłośników psów i ich pupili!
                        </p>
                    </div>
                </OnlyForOrganizers>

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
