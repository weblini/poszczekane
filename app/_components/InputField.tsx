import { type DetailedHTMLProps, type HTMLInputTypeAttribute, type InputHTMLAttributes } from "react"

type Props = {
    label: string,
    name: string,
    type?: HTMLInputTypeAttribute,
    placeholder?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


export default function InputField({ label, name, type = 'text', placeholder = "", ...inputProps }: Props) {

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input type={type} placeholder={placeholder} className="input input-bordered w-full" name={name} {...inputProps}/>
            <label className="label">
                <span className="label-text-alt text-error">Le error</span>
            </label>
        </div>
    )
}