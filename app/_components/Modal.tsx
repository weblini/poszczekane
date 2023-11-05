"use client";

import { forwardRef } from "react";

type Props = {
    children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, Props>(function MyInput(
    { children },
    ref
) {
    return (
        <dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
            <div className="modal-box text-center">
                {children}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>zamknij</button>
            </form>
        </dialog>
    );
});

export default Modal;
