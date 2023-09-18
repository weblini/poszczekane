type Props = {}


export default function ImageInput({ }: Props) {

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Dodaj zdjęcie</span>
            </label>
            <div className="bg-base-100 border rounded-btn border-base-content/20 relative h-40 w-full">
                <img src="https://source.unsplash.com/random/" alt="" className='object-cover rounded-btn h-full w-full' />
                <label htmlFor="file-upload" className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                    <span className='btn btn-circle focus-within:outline-none focus-within:ring focus-within:ring-base-300 focus-within:ring-offset-2'>+</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <label htmlFor="file-upload" className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
                    <span className='btn btn-circle focus-within:outline-none focus-within:ring focus-within:ring-base-300 focus-within:ring-offset-2'>zmień</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
            </div>
            <label className="label">
                <span className="label-text-alt text-error">Alt label</span>
            </label>
        </div>
    )
}