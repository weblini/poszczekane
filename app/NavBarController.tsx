'use client'

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
    toggleId: string
}


export default function NavBarController({ toggleId }: Props) {

    const checkboxRef = useRef<HTMLInputElement | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        // uncheck drawer-toggle to hide main phone nav on pathname change
        if (checkboxRef.current?.checked) {
            checkboxRef.current.checked = false
        }
    }, [pathname]);

    return (
        <input 
            id={toggleId}
            ref={checkboxRef}
            type="checkbox" 
            className="drawer-toggle" 
            aria-label="menu"
        />
    )
}