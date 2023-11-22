import React from 'react'

const Input = ({ type, handleChange, title, placeholder, autocomplete, value, name }) => {
  return (
    <>
      <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="customFileInput">{title}: &nbsp;</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autocomplete ? autocomplete : "off"}
        className="p-2 border border-gray-300 rounded-md text-gray-800 bg-white w-[36rem] mb-4"
      />
      <br />
    </>

  )
}

export default Input