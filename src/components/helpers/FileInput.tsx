import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useMutation } from "@tanstack/react-query";
import { Event, UserData } from "../../types";
import { api } from "../../lib/api";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
function FileInput({ onSetUserData }: { onSetUserData: (val: UserData) => void }) {
  const { t } = useTranslation();
  const [ file, setFile ] = useState<File>();
  function handleChange (e: Event) {
    const { files } = e.target;
    if(files?.length) {
      setFile(files[0])
    }
  }
  const { mutate, isPending } = useMutation({
    mutationFn: () => api.post('Account/UpdateImage', handleFormData()),
    onSuccess: (data) => {
      if(data.status) {
        onSetUserData(data.data)
        toast.success(t('profile_image_updated'))
      }
    }
  })
  function handleSubmit () {
    mutate()
  }
  function handleFormData () {
    if(!file) return
    const formData = new FormData();
    formData.append('File', file);
    return formData;
  }
  return (
    <div className="md:bg-white flex-col gap-4 p-4 flex items-center justify-center w-[192px] md:shadow-border-shadow rounded-2xl">
        <label htmlFor="file">
            <div className="p-1.5 w-[144px] aspect-square border border-[#75757533] border-dashed rounded-full">
                <div className="w-full h-full rounded-full">
                    { file ? <img src={ URL.createObjectURL(file) } className="w-full h-full object-cover rounded-full" /> : 
                    <div className="w-full h-full text-sm rounded-full bg-primary-light flex flex-col items-center justify-center">
                      <img src="/icons/user.svg" />
                      <span className="text-primary">{ t('profile_picture') }</span>
                      <span>jpeg ,jpg ,png ,gif</span>
                    </div> }
                </div>
            </div>
        </label>
        <button onClick={ handleSubmit } disabled={ isPending } className="bg-[#F4F5FA] w-[63px] h-[27px] flex items-center justify-center gap-1 text-sm text-light-blue rounded-md">
          {
            isPending ? <Spinner small /> : <div className="flex items-center justify-center gap-2"><img src="/icons/edit.svg" /> { t('edit') } </div>
          }
        </button>
        <input onChange={(e) => handleChange(e) } accept=".jpg, .jpeg, .png, .gif"  id="file" type="file" className="hidden" />
    </div>
  )
}

export default FileInput
