
type Props = {
    fieldId: string
}


export default function EventSearchBar({ fieldId }: Props) {

    return (
        <form action="/wyszukaj" method="get" className="form-control w-full">
            <div className="relative">
                <label htmlFor={fieldId} className='sr-only'>Szukaj wydarzeń</label>

                <button className="btn btn-ghost btn-square absolute top-0 left-0 rounded-r-none">
                    <svg className="pointer-events-none stroke-current opacity-60" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>

                <input
                    type="search"
                    placeholder="Szukaj wydarzeń..."
                    className="input input-bordered w-full pl-12"
                    autoComplete='off'
                    name='q'
                    id={fieldId}
                />
            </div>
        </form>
    )
}