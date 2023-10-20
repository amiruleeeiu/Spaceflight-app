function Select({ name, onChange, list, label }) {
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
