import FormLayout from "../../layouts/FormLayout"
import Input from "../../components/helpers/Input"
import Button from "../../components/helpers/Button"
import { useState } from "react"
import { useMutation  } from "@tanstack/react-query"
import { InputType } from "../../types"
import { api, setAuthToken } from "../../lib/api"
import { handleFieldValidation, handleFormData, handleFormValidation } from "../../utils"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { setUserData } from "../../store/slices/userDataSlice"
import { toast } from "react-toastify"
import Validation from "../../components/helpers/Validation"
type DataForm = {
    identification: InputType,
    password: InputType
};
const Login = () => {
    const [ isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [ dataForm, setDataForm ] = useState<DataForm>({
        identification: {
            value: '0999999999',
            name: 'identification',
            type: 'text',
            label: 'username' ,
            placeholder: 'username'
        },
        password: {
            value: 'Test1234',
            name: 'password',
            type: 'password',
            label: '' ,
            placeholder: 'password'
        }
    })
    const dispatch = useDispatch<AppDispatch>()
    const { isPending, mutate } = useMutation({
        mutationFn: () => api.post('Account/login', handleFormData(dataForm)),
        onSuccess: (data) => {
            if(data?.status) {
                setAuthToken(data.data.token);
                dispatch(setUserData(data.data));
                toast.success(`Welcome ${ data.data.userName }`)
            } else {
                // console.log(data)
                toast.error('User not found')
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    function handleChange (type: keyof DataForm, value: string | number) {
        setDataForm(prevState => ({
            ...prevState, [ type ]: { ...prevState[ type ], value }
        }))
    }
    function handleSubmit () {
        setIsSubmitted(true);
        if(handleFormValidation(dataForm)) return
        mutate()
    }
    return (
        <FormLayout className="w-full max-w-[400px]">
            <div className="relative">
                <Input onChange={ val => handleChange('identification', val) } data={ dataForm.identification } />
                { isSubmitted && !handleFieldValidation(dataForm.identification) && <Validation /> }
            </div>
            <div className="relative">
                <Input onChange={ val => handleChange('password', val) } data={ dataForm.password } />
                { isSubmitted && !handleFieldValidation(dataForm.password) && <Validation /> }
            </div>
            <Button className="w-full" loading={ isPending } text="login" onClick={ handleSubmit } />
        </FormLayout>
    )
}
export default Login