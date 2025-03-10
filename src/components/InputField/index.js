import './index.css';

export const InputField = ({
  onChangeCallback,
  label,
  maxLength,
  name,
  type,
  error,
  value,
}) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onChangeCallback(value);
  };

  return (
    <div className='input__wrapper'>
      <label><strong>{label}</strong></label>
      <div className={'input__field' + (error ? ' error' : '')}>
        <input
          type={type}
          onChange={handleInputChange}
          value={value}
          maxLength={maxLength}
          name={name}
        />
      </div>
      {error && <span className='error'>{error}</span>}
    </div>
  );
};