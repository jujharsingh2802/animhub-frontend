import React, {useId} from 'react'

const Input = React.forwardRef(function Input(
    { label, type = "text",placeholder, className = "", ref , ...props } 
) {
    const id = useId()
    
  return (
    <div className=' w-full'>
        {label && (
            <label className=' inline-block mb-1 pl-1' htmlFor={id}>
                {label}
            </label>
        )}
        <input 
            type={type}
            placeholder={placeholder}
            className={`px-3 py-2 bg-[#0e0f0f] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600  w-full ${className}`}
            {...props}
            ref= {ref}
            id={id}
        />
    </div>
  )
}
)
export default Input