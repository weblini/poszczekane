type Props = {
    children: React.ReactNode;
    className?: string
};

export default function InfoText({ children, className }: Props) {
    return (
        <p className={`flex items-center text-sm gap-2 text-neutral ${className || ''}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-neutral/50 w-6 h-6 shrink-0"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            {children}
        </p>
    );
}
