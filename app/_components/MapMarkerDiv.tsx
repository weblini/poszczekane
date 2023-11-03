type Props = {
    children: React.ReactNode
};
export default function MapMarkerDiv({children}: Props) {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <svg height="50" viewBox="0 0 61 71">
                <path
                    className="fill-base-300 stroke-white"
                    d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z"
                    strokeWidth="4"
                />
                <circle cx="30.5" cy="30.5" r="8.5" fill="white" />
            </svg>
            <div className="text-center text-sm">
                {children}
            </div>
        </div>
    );
}
