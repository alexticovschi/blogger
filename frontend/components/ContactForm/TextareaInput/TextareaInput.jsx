import React from 'react';
import './TextareaInput.scss';

const TextareaInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className='form-group'>
      <textarea
        className='form-group__textarea'
        onChange={handleChange}
        {...otherProps}
      ></textarea>
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-group__textarea-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default TextareaInput;
