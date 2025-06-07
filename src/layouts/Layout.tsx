import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "../components/core/Sidebar"
import Navbar from "../components/core/Navbar"
import { useSelector } from "react-redux"
import { RootState } from "../store"
const Layout = () => {
    const userData = useSelector((state: RootState) => state.userData.value);
    return (
        <div className="h-screen overflow-hidden flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="md:px-normal px-mini relative z-0 bg-[#F4F5FA] flex-1 md:rounded-tl-[20px] h-[calc(100%-100px)]">
                    { userData?.token ? <Outlet /> : <Navigate to="/auth/login" /> }
                </div>
            </div>
        </div>
    )
}
export default Layout