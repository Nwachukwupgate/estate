import { useState } from "react";

function CustomSelect({ data, handleChange, title, value, name }) {

  const options = data.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  return (
    <>
      <select
        name={name}
        onChange={handleChange}
        value={value}
        className="p-2 border border-gray-300 rounded-md text-gray-800 bg-white w-[36rem] mb-4"
      >
        <option value="">{title}</option>
        {options}
      </select>
      <br />
    </>
  );
}

export default CustomSelect;
