type Props = {
    label?: string;
    isLoading?: boolean;
    isSecondary?: boolean;
};

export default function SubmitButton({ label, isLoading, isSecondary }: Props) {
    return (
        <button
            className={`btn ${isSecondary ? "btn-secondary" : "btn-primary"} ${isLoading ? "btn-disabled" : ""}`}
            aria-disabled={isLoading}
        >
            {isLoading && <span className="loading loading-spinner"></span>}
            {label}
        </button>
    );
}
