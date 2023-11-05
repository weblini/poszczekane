import { infoPath, errorPath, confirmPath } from "./svgPaths";

type Props = {
    children: React.ReactNode;
    isUpdating?: boolean;
    category?: "info" | "error" | "confirm";
};

export default function InfoDiv({
    children,
    isUpdating,
    category = "info",
}: Props) {
    return (
        <div
            className={`text-center p-4 flex flex-col gap-3 justify-center items-center w-full rounded-box border transition-opacity${
                isUpdating ? " opacity-30" : ""
            }${category === "confirm" ? " bg-success/20 border-success" : ""}${
                category === "error" ? " bg-error/20 border-error" : ""
            }${category === "info" ? " bg-base-200 border-base-300" : ""}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className={`w-8 h-8${
                    category === "confirm" ? " fill-success" : ""
                }${category === "error" ? " fill-error" : ""}${
                    category === "info" ? " fill-neutral/80" : ""
                }`}
            >
                {category === "info" && infoPath}
                {category === "error" && errorPath}
                {category === "confirm" && confirmPath}
            </svg>
            {children}
        </div>
    );
}
