const TextInput = ({
  label,
  value,
  onChange,
  name,
  required = false,
  placeholder = "",
}) => (
  <div className="input-blocks">
    <label>
      {label}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
    <input
      type="text"
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
