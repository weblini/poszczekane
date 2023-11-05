import { confirmPath, errorPath, infoPath } from "./svgPaths";

type Props = {
    children: React.ReactNode;
    className?: string;
    category?: "info" | "error" | "confirm";
};

export default function InfoText({
    children,
    className,
    category = "info",
}: Props) {
    return (
        <div
            className={`flex items-center text-sm gap-2${
                category === "error" ? " text-error" : " text-neutral"
            } ${className || ""}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className={`w-6 h-6 shrink-0${
                    category === "error" ? " fill-error" : " fill-neutral/80"
                }`}
            >
                {category === "info" && infoPath}
                {category === "error" && errorPath}
                {category === "confirm" && confirmPath}
            </svg>
            <p>{children}</p>
        </div>
    );
}
