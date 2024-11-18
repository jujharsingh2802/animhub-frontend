import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-[#0F0F0F]",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button className={`${type} ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button