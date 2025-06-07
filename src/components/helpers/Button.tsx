import { ButtonType } from "../../types"
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next"
function Button({ loading = false, text, onClick, className = 'mx-auto w-full', primary = true }: ButtonType) {
  const { t } = useTranslation();
  return (
    <button className={`block rounded-full h-[43px] ${ primary ? 'bg-primary text-white' : 'bg-[#F4F8FF] text-[#657397]' } ${ className }`} disabled={ loading } onClick={ onClick }>
        {
          loading ? (
            <Spinner />
          ) : <span>{ t(text) }</span>
        }
    </button>
  )
}

export default Button
