import { useState } from "react"
import FileInput from "../../components/helpers/FileInput"
import Input from "../../components/helpers/Input"
import { InputType, UserData } from "../../types"
import Button from "../../components/helpers/Button"
import { handleFieldValidation, handleFormData, handleFormValidation, handleSetDataForm } from "../../utils"
import { useDispatch } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/api"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { AppDispatch } from "../../store"
import { setUserData } from "../../store/slices/userDataSlice"
import Validation from "../../components/helpers/Validation"
type DataForm = {
    userName: InputType
}
function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [ isSubmitted, setIsSubmitetd ] = useState<boolean>(false);
  const [ dataForm, setDataForm ] = useState<DataForm>({
    userName: {
        value: '',
        name: 'userName',
        type: 'text',
        label: 'username' ,
        placeholder: 'username'
    }
  })
  function handleChange (type: string, value: string | number) {
    setDataForm(prevState => handleSetDataForm(prevState, type, value))
  }
  const { mutate, isPending: isSubmitPending } = useMutation({
    mutationFn: () => api.post('Account/UpdateUserName', handleFormData(dataForm)),
    onSuccess: (data) => {
      if(data.status) {
        handleSetData(data.data)
        toast.success(t('username_update_successfully'))
        setIsSubmitetd(false)
      }
    }
  })
  function handleSubmit () {
    setIsSubmitetd(true)
    if(handleFormValidation(dataForm)) return
    mutate()
  }
  function handleSetData (data: UserData) {
    // console.log(data)
    dispatch(setUserData(data))
  }
  const { isPending, error, data } = useQuery({
    queryKey: ['userDataRepo'],
    queryFn: () => api.get('Account/Profile')
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  return ( 
    <div className="max-w-[1000px] mx-auto pt-8 flex flex-col items-end">
        <div className="w-full flex md:gap-8 md:bg-transparent bg-white md:flex-row flex-col md:items-stretch items-center md:rounded-none rounded-2xl md:shadow-none shadow-border-shadow">
            <FileInput onSetUserData={ (val: UserData) => handleSetData(val) } />
            <div className="md:flex-1 w-full md:bg-white md:shadow-border-shadow rounded-2xl p-6">
                <h3 className="md:block hidden mb-6">{ t('your_info') }</h3>
                <div className="relative">
                  <Input defaultValue={ data?.data?.userName } data={ dataForm.userName } onChange={ (val) => handleChange('userName', val) } />
                  { isSubmitted && !handleFieldValidation(dataForm.userName) && <Validation /> }
                </div>
            </div>
        </div>
        <Button loading={ isSubmitPending } className="md:w-[95px] w-full md:mt-12 mt-4" text="save" onClick={ handleSubmit } />
    </div>
  )
}

export default Profile
