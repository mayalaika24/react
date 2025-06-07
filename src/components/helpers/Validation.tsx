import { useTranslation } from "react-i18next";
function Validation({ validation = 'required' }: { validation?: string }) {
    let message;  
    if(validation === 'password') {
      message = 'week_password'
    } else if (validation === 'confirm') {
      message = 'password_does_not_match'
    } else {
      message = 'required_field'
    }
  const { t } = useTranslation();
  return (
    <>
        <span className="absolute rtl:right-0 ltr:left-0 top-[100%] text-xs text-red">{ t(message) }</span>
    </>
  )
}

export default Validation
