'use client';

import Link from 'next/link';

export default function Home() {

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="h-[30%] w-[30%] flex flex-col justify-start items-center bg-gray-200 rounded-xl p-6">
                <span className="text-2xl font-bold mb-4">RCI Mental Health Dashboard</span>
                <div className="w-full flex flex-col justify-evenly items-start mb-6">
                    <Link className="underline" href="/providers">View current providers</Link>                
                </div>
                <div className="w-full flex flex-col justify-evenly items-start mb-6">
                    <Link className="underline" href="/create">Create a new provider</Link>                
                </div>
                <div className="w-full flex flex-col justify-evenly items-start text-black">
                    <a className="underline" target="_blank" href="mailto:gamble.cooper23@gmail.com?subject=%5BURGENT%5D%20RCI%20Mental%20Health%20Project%20Bug">Request new feature or report a bug</a>                
                </div>                
            </div>
        </div>
    )
}