type Props = {
    label?: string;
    isLoading?: boolean;
};

export default function SubmitButton({ label, isLoading }: Props) {
    return (
        <button
            className={`btn btn-primary ${isLoading ? "btn-disabled" : ""}`}
            aria-disabled={isLoading}
        >
            {isLoading && <span className="loading loading-spinner"></span>}
            {label}
        </button>
    );
}
