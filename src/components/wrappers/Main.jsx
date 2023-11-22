import React from 'react'

const Main = ({children, className=""}) => {
  return (
    <div className={`transition-2 duration-300 ml-64 ${className}`}>
        <div className='max-w-[1200px] mx-auto'>
            {children}
        </div>
    </div>
  )
}

export default Main