import { useState } from "react"
import { InputType, OnChange } from "../../types"
import useEffectOnUpdate from "../../custom-hooks/useEffectOnUpdate";
import { useTranslation } from "react-i18next";

function Input({ data, onChange, defaultValue = null }: { isSubmitted?: boolean, data: InputType, onChange: OnChange, defaultValue?: any }) {
  const [ value, setValue ] = useState<any>(data.value);
  const { t } = useTranslation();
  function handleChange (e: React.ChangeEvent<HTMLInputElement> ) {
    const temp = e.target.value;
    setValue(temp);
    onChange(temp);
  }
  useEffectOnUpdate(() => {
    if(defaultValue) {
      setValue(defaultValue)
      onChange(defaultValue)
    }
  }, [ defaultValue ])
  return (
    <div className="relative">
      { data.label && <label className="absolute bg-white ltr:left-5 rtl:right-5 -top-3">{ t(data.label) }</label> }
      <input className="w-full border-1 border-[#75757533] h-[50px] rounded-full px-4" type={ data.type } placeholder={ data.placeholder ? t(data.placeholder) : '' } value={ value } onChange={ handleChange } />
    </div>
  )
}

export default Input
