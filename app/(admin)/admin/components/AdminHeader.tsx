import ThemeButton from "@/components/shared/ThemeButton";
import LogoutButton from "./buttons/LogoutButton";

function AdminHeader() {
    return (
        <nav className="py-3 px-6 bg-blue-500 flex justify-between items-center h-25 component-bg-custom border-b border-custom">
            <p className="font-light text-xl">Admin</p>
            <div className="flex gap-4 items-center">
                <ThemeButton />
                <LogoutButton />
            </div>
        </nav>
    )
}

export default AdminHeader;