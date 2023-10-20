import React from "react";

interface SelectProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  list: { value: string; name: string }[];
  label: string;
}

function Select({ name, onChange, list, label }: SelectProps) {
  return (
    <select className="form-select" onChange={onChange} name={name}>
      <option value="">{label}</option>
      {list.length > 0 &&
        list.map((i, index) => (
          <option key={index} value={i?.value}>
            {i?.name}
          </option>
        ))}
    </select>
  );
}

export default Select;
