'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Navbar() {

    const { user, isLoaded } = useUser();
    const pathname = usePathname();

    const processPathname = (pathname: string) => {
        if (pathname == "/") {
            return "Dashboard";
        } else if (pathname == "/providers") {
            return "Providers"
        } else if (pathname == "/create") {
            return "Create a Provider"
        } else {
            return "Edit a Provider"
        }
    }

    return ( 
        isLoaded && user && (
            <div className="p-6 flex w-full justify-between items-center">
                <span>You&apos;re currently viewing <span className="font-bold">{processPathname(pathname)}</span>. {pathname != "/" && <a href="/" className="underline">Go back</a>}</span>
                <UserButton afterSignOutUrl='/sign-in'/>
            </div>
        )
    )
}