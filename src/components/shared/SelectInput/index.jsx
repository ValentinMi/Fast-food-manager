import React from "react";

const SelectInput = ({ length, onChange }) => {
  // Create array with stock to map it in select input
  const stock = Array.from({ length }, (v, k) => k + 1);

  const handleChange = event => {
    onChange(parseInt(event.target.value));
  };

  return (
    <select className={"form-control select-input"} onChange={handleChange}>
      {stock.map(n => (
        <option key={`select${n}`} value={n}>
          {n}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
