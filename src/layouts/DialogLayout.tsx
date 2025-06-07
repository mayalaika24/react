import { useEffect, useRef, useState } from "react"
import Button from "../components/helpers/Button"

type Data = {
    header?: string,
    buttonText?: string,
    onClick?: () => void,
    onClose: () => void
    children: React.ReactNode,
    loading?: boolean,
    readonly?: boolean,
    small?: boolean,
    theme?: 'primary' | 'red',
    centerlizedButton?: boolean
}

function DialogLayout({ centerlizedButton = false, header='', onClick = () => {}, children, onClose = () => {}, loading = false, small = false, theme = 'primary' }: Data) {
  const divEl = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
        setAnimate(true)
    }, 10)
    return () => {
        clearTimeout(timeout)
    }
  }, [])
  function handleCloseDialog () {
    setAnimate(false)
    setTimeout(() => {
        onClose()
    }, 300)
  }
  return (
    <div className="fixed w-screen h-screen z-[100] flex md:items-center items-end justify-center left-0 top-0 bg-[#090D293D] backdrop-blur-sm">
        <div ref={ divEl } className={`bg-white transition-all duration-500 py-4 max-h-[90vh] md:w-max w-full rounded-t-[30px] md:rounded-b-[30px] flex flex-col gap-6 relative ${ animate ? 'translate-y-0' : 'translate-y-[200%]' }`}>
            { header && (
                <div className=" px-8">
                    <h2 className="text-secondary capitalize text-start font-bold text-xl">{ header }</h2>
                </div>
            )}
            <div className={`flex flex-col gap-4 flex-1 overflow-y-auto md:px-8 sm:px-6 pb-4 px-4 w-full ${ small ? 'md:w-[350px]' : 'md:w-[400px]' }`}>
                { children }
            </div>
            <div className={`md:px-8 sm:px-6 px-4 flex items-center md:flex-row flex-col-reverse gap-3 ${ centerlizedButton ? 'justify-center' : 'justify-end' }`}>
                <Button className="md:w-[106px] w-full" onClick={ handleCloseDialog } text="cancel" primary={ false } />
                <Button className={`md:w-[106px] w-full ${ theme === 'red' ? 'bg-red' : '' }`} loading={ loading } onClick={ onClick } text="submit" />
            </div>
        </div>
    </div>
  )
}

export default DialogLayout
