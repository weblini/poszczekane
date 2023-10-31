
export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="wrapper max-w-5xl w-full">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <h1>Twoje konto</h1>
                    </li>
                    <li>
                        Gdzieś dalej
                    </li>
                </ul>
            </div>

            {children}
        </div>
    );
}
