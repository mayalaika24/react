import { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";
import PopoverComponent from "../helpers/Popover";
import useNavigation from "../../custom-hooks/useNavigation";
import UpdatePasswordDialog from "../dialogs/UpdatePasswordDialog";
import LogoutDialog from "../dialogs/LogoutDialog";
import { useDispatch } from "react-redux";
import { handleToggleSidebar } from "../../store/slices/sidebarSlice";
const Navbar = () => {
    const [ isUpdatePasswordDialog, setIsUpdatePasswordDialog ] = useState<boolean>();
    const [ isLogoutDialog, setIsLogoutDialog ] = useState<boolean>();
    const userData = useSelector((state: RootState) => state.userData.value) || null;
    const dispatch = useDispatch<AppDispatch>();
    const { t, i18n } = useTranslation();
    const handleNavigate = useNavigation();
    function handleNavigateToProfile () {
        handleNavigate('/profile');
    }
    function handleOpenUpdateDialog () {
        setIsUpdatePasswordDialog(true);
    }
    function handleOpenLogoutDialog () {
        setIsLogoutDialog(true);
    }
    function handleLanguageChange () {
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
    }
    return (
        <>
            <div className="bg-white w-full h-[100px] flex items-center justify-between md:pe-6 px-normal">
                <div className="flex-1">
                    <button onClick={() => dispatch(handleToggleSidebar(true))} className="md:hidden block">
                        <img src="/icons/toggle.svg" />
                    </button>
                </div>
                <div className="flex items-center gap-5">
                    <button onClick={ handleLanguageChange }>
                        <img className="w-[26px] h-[18px] rounded-sm" src={`/icons/${ i18n.language === 'ar' ? 'us' : 'sa' }-flag.webp`} />
                    </button>
                    {
                        userData && (
                        <div className="flex items-center gap-4">
                            <PopoverComponent onLogout={ handleOpenLogoutDialog } onUpdatePassword={ handleOpenUpdateDialog } onNavigateToProfile={ handleNavigateToProfile } />
                            <div className="sm:flex hidden flex-col gap-1">
                                <span>{ t('my_account') }</span>
                                <span>{ userData.userName }</span>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
            {
                isUpdatePasswordDialog && (
                    <UpdatePasswordDialog onClose={ () => setIsUpdatePasswordDialog(false) }  />
                )
            }
            {
                isLogoutDialog && (
                    <LogoutDialog onClose={ () => setIsLogoutDialog(false) } />
                )
            }
        </>
    )
}
export default Navbar