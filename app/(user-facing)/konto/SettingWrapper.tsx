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

            <div className="grid gap-2 md:gap-4 md:grid-cols-[auto_200px]">
                <p className="text-sm min-h-12">{desc}</p>
                {action}
            </div>

            {children}
        </section>
    );
}
