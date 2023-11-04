import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    wrapperStyles?: string,
    label: string,
    register?: UseFormRegisterReturn,
    error?: string,
    [key: string]: any,
};

export default function Input({label, register, error, wrapperStyles = "", ...other}: Props) {
    return (
        <div className={`form-control ${wrapperStyles}`}>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <textarea
                className={`textarea textarea-bordered disabled:opacity-70 disabled:cursor-text ${error ? "input-error" : ""}`}
                {...register}
                {...other}
            />
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">
                        {error}
                    </span>
                </label>
            )}
        </div>
    );
}