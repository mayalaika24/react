import { useRef } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { Route } from "../../types"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useDispatch } from "react-redux"
import { handleToggleSidebar } from "../../store/slices/sidebarSlice"
import useEffectOnUpdate from "../../custom-hooks/useEffectOnUpdate"
const Sidebar = () => {
    const sidebarEl = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const isOpen = useSelector((state: RootState) => state.sidebar.value);
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const routes = [
        { path: '/', title: 'products' },
        { path: '/medicins', title: 'medicins' },
    ]
    function handleActiveClass (route: Route): boolean {
        return location.pathname === route.path ? true : false
    }
    function handleCloseSidebar () {
        dispatch(handleToggleSidebar(false))
    }
    useEffectOnUpdate(() => {
        handleCloseSidebar()
    }, [ location.pathname ])
    return (
        <>
            <div onClick={ handleCloseSidebar } className={`fixed w-full h-full bg-[#090D293D] backdrop-blur-sm z-[10] md:hidden ${ isOpen ? 'block' : 'hidden' }`}></div>
            <div ref={ sidebarEl } className={`bg-navy lg:w-[275px] md:w-[225px] w-full md:rounded-t-0 rounded-t-[20px] md:py-5 py-10 text-[#8F9BBA] flex-col flex md:relative fixed z-[100] bg-white bottom-0 transition-all duration-300 ${ isOpen ? 'translate-y-0' : 'md:translate-y-0 translate-y-[100%]' }`}>
                <img src="/small-logo.svg" className="mb-24 mt-5 md:block hidden ms-8 w-[140px]" />
                <div className="flex flex-col gap-4 pe-3">
                    {
                        routes.map((route, i) => {
                            return <Link className={`text-xl w-full h-[50px] rounded-e-xl relative ${ handleActiveClass(route) ? 'bg-[#E7FFFC]' : 'bg-transparent' }`} to={ route.path } key={ i }>
                                    <div className={`w-1 absolute top-0 bottom-0 rounded-e-xl ltr:left-0 rtl:right-0 ${ handleActiveClass(route) ? 'bg-primary' : '' }`}></div>
                                    <div className="ps-8 flex items-center gap-4 w-full h-full">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_11203_20486)">
                                            <path opacity="0.32" fillRule="evenodd" clipRule="evenodd" d="M16.9114 9.16249C15.4717 9.52464 13.7718 9.5487 12.3035 9.10015C11.6828 8.9105 11.1988 8.42694 10.9893 7.81264C10.4674 6.28232 10.3385 4.40917 10.722 2.96735C9.92791 2.9474 9.02484 2.93555 8 2.93555C4.51575 2.93555 2.43945 3.07237 1.26285 3.19934C0.391165 3.2934 -0.280985 3.88381 -0.444195 4.74522C-0.69825 6.0861 -1 8.5928 -1 12.9355C-1 17.2783 -0.69825 19.785 -0.444195 21.1259C-0.280985 21.9873 0.391165 22.5777 1.26285 22.6717C2.43945 22.7987 4.51575 22.9355 8 22.9355C11.4843 22.9355 13.5606 22.7987 14.7372 22.6717C15.6089 22.5777 16.281 21.9873 16.4442 21.1259C16.6982 19.785 17 17.2783 17 12.9355C17 11.48 16.9661 10.2307 16.9114 9.16249ZM4 13.9355C3.4477 13.9355 3 13.4878 3 12.9355C3 12.3832 3.4477 11.9355 4 11.9355H8C8.5523 11.9355 9 12.3832 9 12.9355C9 13.4878 8.5523 13.9355 8 13.9355H4ZM4 18.4355C3.4477 18.4355 3 17.9878 3 17.4355C3 16.8832 3.4477 16.4355 4 16.4355H11C11.5523 16.4355 12 16.8832 12 17.4355C12 17.9878 11.5523 18.4355 11 18.4355H4Z" fill={`${ location.pathname === route.path ? '#4ADDCA' : '#8F9BBA80' }`}/>
                                            <path d="M3 17.436C3 17.9883 3.4477 18.436 4 18.436H11C11.5523 18.436 12 17.9883 12 17.436C12 16.8837 11.5523 16.436 11 16.436H4C3.4477 16.436 3 16.8837 3 17.436Z" fill={`${ handleActiveClass(route) ? '#4ADDCA' : '#8F9BBA' }`}/>
                                            <path d="M3 12.936C3 13.4883 3.4477 13.936 4 13.936H8C8.5523 13.936 9 13.4883 9 12.936C9 12.3837 8.5523 11.936 8 11.936H4C3.4477 11.936 3 12.3837 3 12.936Z" fill={`${ handleActiveClass(route) ? '#4ADDCA' : '#8F9BBA' }`}/>
                                            <path d="M16.9114 9.16298C15.4717 9.52513 13.7718 9.54918 12.3036 9.10063C11.6828 8.91098 11.1988 8.42743 10.9893 7.81313C10.4674 6.28278 10.3384 4.4096 10.722 2.96777C10.722 2.96777 11.9461 3.43597 14.1961 5.68597C16.4461 7.93598 16.9114 9.16298 16.9114 9.16298Z" fill={`${ handleActiveClass(route) ? '#4ADDCA' : '#8F9BBA' }`}/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_11203_20486">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.967773)"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                        <span className={`${ location.pathname === route.path ? 'text-primary font-bold' : '' }`}>{ t(route.title) }</span>
                                    </div>
                                </Link>
                        })
                    }
                </div>
                <div></div>
            </div>
        </>
    )
}
export default Sidebar