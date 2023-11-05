export default function Loading() {
    return (
        <main className="wrapper w-full grid gap-8 lg:gap-12 md:grid-cols-[1fr_360px] max-w-7xl animate-pulse">
            <div>
                <div className="flex flex-wrap gap-2 pb-2">
                    <span className="rounded-full bg-base-200 h-5 w-16" />
                </div>

                <h1 className="font-extrabold text-3xl md:text-4xl">
                    <span className="rounded-full bg-base-200 w-32 h-9" />
                </h1>
            </div>

            <div className="card shadow bg-base-200/50 max-w-sm justify-self-center w-full">
                <div className="card-body h-56 justify-end">
                    <span className="btn btn-disabled w-full"></span>
                </div>
            </div>

            <div className="md:col-span-2">
                <span className="rounded-full bg-base-200 w-24 h-5" />
            </div>
        </main>
    );
}
