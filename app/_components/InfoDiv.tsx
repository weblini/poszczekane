type Props = {
    children: React.ReactNode;
};

export default function InfoDiv({ children }: Props) {
    return (
        <div className="text-center p-6 flex flex-col gap-4 justify-center items-center w-full rounded-box bg-base-200 border border-base-300">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-neutral/80 w-8 h-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            {children}
        </div>
    );
}
