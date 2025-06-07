import { useDispatch } from "react-redux"
import DialogLayout from "../../layouts/DialogLayout"
import { useTranslation } from "react-i18next";
import { clearUserData } from "../../store/slices/userDataSlice"
import { AppDispatch } from "../../store";
import useNavigation from "../../custom-hooks/useNavigation";
import { toast } from "react-toastify";
function LogoutDialog({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const handleNaigate = useNavigation()
  function handleClose () {
    dispatch(clearUserData());
    handleNaigate('/auth/login')
    toast.success('Logged out successfully!')
  }
  return (
    <DialogLayout theme="red" centerlizedButton small onClose={ onClose } onClick={ () => handleClose() }>
        <div className="flex flex-col items-center justify-center gap-4">
            <img className="w-[70px] aspect-square" src="/images/logout.svg" />
            <h3 className="font-700 text-[#172A47]">{ t('logout') }</h3>
            <span className="text-[#8F9BBA]">{ t('insure_logout') }</span>
        </div>
    </DialogLayout>
  )
}

export default LogoutDialog
