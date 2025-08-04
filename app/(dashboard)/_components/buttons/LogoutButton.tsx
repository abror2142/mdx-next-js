'use client'

import { useState } from "react"
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            signOut({callbackUrl: '/'});
        }catch(e) {
            console.log(e)
        }
    }

    return (
        <>
            {
                open
                ? <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white flex flex-col gap-3 px-8 py-8 rounded-md min-w-sm relative">
                        <p className="text-xl text-center">Are you sure to logout?</p>
                        <div className="flex items-center justify-center gap-2">
                            <div 
                                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded-sm text-white"
                                onClick={() => setOpen(prev => !prev)}
                            >
                                No
                            </div>
                            <div>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-sm text-white"
                                >Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
                : <div>
                    <button 
                        className="px-3 py-1.5  rounded-sm text-gray-700 bg-gray-100 hover:bg-gray-200 text-sm" 
                        onClick={() => setOpen(true)}
                    >
                        Logout
                    </button>
                </div>
            } 
        </>
    )
}