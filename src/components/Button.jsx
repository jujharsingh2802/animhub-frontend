import React from 'react'

function Button(
    children,
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    className = "",
    ...props
) {
  return (
    <button className={`${type} ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button