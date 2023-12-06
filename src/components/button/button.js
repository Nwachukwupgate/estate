import React from 'react'

const Button = ({label, colour, color, className, onClick, disabled}) => {
    const handleClick = () => {
        if (typeof onClick === 'function') {
          onClick();
        }
    };

  return (
    <button className={` ${className} px-6 py-2 font-medium tracking-wide text-${color} capitalize transition-colors duration-300 transform bg-${colour}-600 rounded-lg hover:bg-${colour}-500 focus:outline-none focus:ring focus:ring-${colour}-300 focus:ring-opacity-80`} onClick={handleClick}
    disabled={disabled}>
        {label}
    </button>
  )
}

export default Button