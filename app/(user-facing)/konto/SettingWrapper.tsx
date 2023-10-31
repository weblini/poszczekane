type Props = {
    title: string;
    desc: string;
    children?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
};
export default function SettingWrapper({
    title,
    desc,
    children,
    action,
    className
}: Props) {
    return (
        <section className={className}>
            <h2 className="title-base pb-1">{title}</h2>
            <div className="pb-2 lg:pb-3 flex max-md:flex-col gap-2 justify-between md:items-center">
                <p className="text-sm">{desc}</p>
                {action}
            </div>

            {children}
        </section>
    );
}
