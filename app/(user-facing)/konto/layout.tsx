import AccountBreadcrumb from "./AccountBreadcrumb";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="wrapper max-w-5xl w-full">
            <AccountBreadcrumb/>
            
            {children}
        </div>
    );
}
