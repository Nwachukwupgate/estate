import { useState } from "react";

function CustomTextArea({ name, title, rows = 20, placeholder, handleChange, value }) {

  return (
    <>
      <label className="block mb-2 text-gray-700 dark:text-gray-300 mt-4" htmlFor="customTextarea">
        {title}
      </label>
      <textarea
        id="customTextarea"
        name={name}
        value={value}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded-md text-gray-800 bg-white w-[36rem] resize-none"
      />
      <br />
    </>
  );
}

export default CustomTextArea;
