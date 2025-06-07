import { useState } from "react"
import DialogLayout from "../../layouts/DialogLayout"
import { InputType } from "../../types"
import Input from "../helpers/Input"
import { useMutation } from "@tanstack/react-query"
import { api } from "../../lib/api"
import { handleFieldValidation, handleFormData, handleFormValidation } from "../../utils"
import { handleSetDataForm } from "../../utils"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import Validation from "../helpers/Validation"
type DataForm = {
    oldPassword: InputType,
    newPassword: InputType,
    confirmPassword: InputType
}
function UpdatePasswordDialog({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [ isSubmitted, setIsSubmitetd ] = useState<boolean>(false);
  const [ dataForm, setDataForm ] = useState<DataForm>({
        oldPassword: {
            value: '',
            name: 'oldPassword',
            type: 'password',
            placeholder: 'old_password',
            validation: 'required'
        },
        newPassword: {
            value: '',
            name: 'newPassword',
            type: 'password',
            placeholder: 'new_password',
            validation: 'password'
        },
        confirmPassword: {
            value: '',
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'confirm_password',
            validation: 'confirm'
        }
    })
  const { isPending, mutate } = useMutation({
    mutationFn: () => api.post('Account/UpdatePassword', handleFormData(dataForm)),
    onSuccess: (data: any) => {
      if(data.status) {
        toast.success('Password Updated Successfully');
        setIsSubmitetd(true);
        onClose();
      } else {
        toast.error(data?.errorMessage || 'Something went wrong');
      }
    }
  })
  function handleChange (type: string, value: string | number) {
    setDataForm(prevState => handleSetDataForm(prevState, type, value))
  }
  function handleSubmit () {
    setIsSubmitetd(true);
    // console.log(handleFormValidation(dataForm, dataForm.newPassword.value))
    if(handleFormValidation(dataForm, dataForm.newPassword.value)) return
    mutate()
  }
  return (
    <DialogLayout onClose={ onClose } loading={ isPending } header={ t('update_password') } onClick={ handleSubmit }>
        <div className="relative">
          <Input isSubmitted={ isSubmitted } data={ dataForm.oldPassword } onChange={(val) => handleChange(dataForm.oldPassword.name, val)} />
          { isSubmitted && !handleFieldValidation(dataForm.oldPassword) && <Validation validation={ dataForm.oldPassword.validation } /> }
        </div>
        <div className="relative">
          <Input isSubmitted={ isSubmitted } data={ dataForm.newPassword } onChange={(val) => handleChange(dataForm.newPassword.name, val)} />
          { isSubmitted && !handleFieldValidation(dataForm.newPassword) && <Validation validation={ dataForm.newPassword.validation } /> }
        </div>
        <div className="relative">
          <Input isSubmitted={ isSubmitted } data={ dataForm.confirmPassword } onChange={(val) => handleChange(dataForm.confirmPassword.name, val)} />
          { isSubmitted && !handleFieldValidation(dataForm.confirmPassword, dataForm.newPassword.value) && <Validation validation={ dataForm.confirmPassword.validation } /> }
        </div>
    </DialogLayout>
  )
}

export default UpdatePasswordDialog
