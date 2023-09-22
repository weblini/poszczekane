type Props = {
    wrapperClasses?: string
}


export default function Loader({ wrapperClasses = '' }: Props) {
    
    return (
        <div className={`grow w-full grid place-items-center pt-8 ${wrapperClasses}`}>
            <span className="loading loading-ball loading-lg text-primary"></span>
        </div>
    )
}