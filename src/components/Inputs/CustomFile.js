import React, { useState } from "react";

function CustomFileInput({ title, selectedFile, handleChange, name }) {

  return (
    <>
      <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="customFileInput">
        {title}
      </label>
      <input
        type="file"
        id="customFileInput"
        name={name}
        onChange={handleChange}
        accept="image/*"
        className="p-2 border border-gray-300 rounded-md text-gray-800 bg-white w-[36rem]"
      />
      {selectedFile && <p className="mt-2 text-green-600">File selected: {selectedFile.name}</p>}
      <br />
    </>
  );
}

export default CustomFileInput;
