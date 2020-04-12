import './FormInput.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='form-group'>
    <input
      className='form-group__input'
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-group__input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
