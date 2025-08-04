import { useState } from "react"
import AdminHeader from "./AdminHeader"
import AdminFileTree from "./file-tree/AdminFileTree"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretSquareLeft, faCaretSquareRight, faUser   } from "@fortawesome/free-regular-svg-icons"

export const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>  
            {
                isOpen
                ? <div className="flex flex-col w-70 h-screen border-r  border-custom">  
                    <AdminHeader />
                    <AdminFileTree />
                    <div className="flex justify-end p-4">
                        <FontAwesomeIcon icon={faCaretSquareLeft} onClick={() => setIsOpen(prev => !prev)} className="text-2xl text-end text-blue-400 hover:text-blue-500"/>
                    </div>
                </div>
                : <div className="flex flex-col border-r justify-between border-gray-300">
                    <nav className="py-3 px-6 bg-blue-500 flex justify-between items-center h-25 text-white">
                        <FontAwesomeIcon icon={faUser} />
                    </nav>
                    <FontAwesomeIcon icon={faCaretSquareRight} onClick={() => setIsOpen(prev => !prev)} className="text-2xl text-end text-blue-400 hover:text-blue-500 p-4"/>
                </div>
            }
        </>

    )
}