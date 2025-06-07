import { Children } from "../types"

function FormLayout({ children, className = '' }: { children: Children, className?: string }) {
  return (
    <div className={`bg-white p-7 rounded-40 mx-auto flex flex-col gap-5 ${ className }`}>
      { children }
    </div>
  )
}

export default FormLayout
