import { Navbar } from "../Navbar"

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 bg-base-200">
                {children}
            </main>
        </div>
    )
}
