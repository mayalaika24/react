import { Outlet, Navigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "../store"
function AuthLayout() {
  const { t } = useTranslation();
  const userData = useSelector((state: RootState) => state.userData.value);
  return (
    <div className="h-screen w-full overflow-hidden p-5">
      <div className="flex lg:flex-row flex-col items-center justify-center xl:gap-40 sm:gap-20 gap-10 w-full h-full bg-[url('/images/auth-bg.png')] px-inline-space rounded-40 bg-cover bg-center">
        <div className="flex lg:items-end items-center justify-center h-max flex-col gap-4 lg:flex-1">
          <img className="lg:w-[262px] aspect-[262/250] w-[179px]" src="/logo.svg" />
          <h1 className="text-32 font-700 text-center md:block hidden">{ t('welcome') }</h1>
        </div>
        <div className="lg:flex-1 flex w-full">
          { userData?.token ? <Navigate to="/" /> : <Outlet /> }
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
