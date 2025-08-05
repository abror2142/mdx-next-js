'use client'

import ThemeButton from "../../../components/shared/ThemeButton";
import SearchBar from "./SearchBar";

function Header () {

    return (    
        <nav className="px-6 py-3 border-b border-custom flex justify-between items-center">
            <div className="flex gap-1 items-end">
                <p className="text-3xl font-semibold font-mono">easy</p>
                <p className="text-xl font-semibold">Docs</p>
            </div>
            <div className="grow-1 flex gap-3 items-center justify-end">
                <SearchBar />
                <ThemeButton />
            </div>
        </nav>
    )
}

export default Header;