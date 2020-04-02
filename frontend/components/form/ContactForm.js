import { useState } from 'react';
import { emailContactForm } from '../../actions/form';

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: false
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const handleSubmit = async e => {
    e.preventDefault();

    setValues({ ...values, buttonText: 'Sending...' });
    let sentEmail = await emailContactForm({
      authorEmail,
      name,
      email,
      message
    });

    if (sentEmail.success) {
      setValues({
        ...values,
        sent: true,
        name: '',
        email: '',
        message: '',
        buttonText: 'Message Sent',
        success: sentEmail.success
      });
    } else {
      setValues({ ...values, error: sentEmail.error });
    }
  };

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: 'Send Message'
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className='alert alert-info'>Thank you for contacting us</div>
    );

  const showErrorMessage = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  return (
    <div>
      <h2 className='mt-5 mb-4'>Contact</h2>
      {showSuccessMessage()}
      {showErrorMessage()}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='lead'>Message</label>
          <textarea
            className='form-control'
            onChange={handleChange('message')}
            type='text'
            value={message}
            rows='5'
            required
          ></textarea>
        </div>

        <div className='form-group'>
          <label className='lead'>Name</label>
          <input
            type='text'
            onChange={handleChange('name')}
            className='form-control'
            value={name}
            required
          />
        </div>

        <div className='form-group'>
          <label className='lead'>Email</label>
          <input
            type='email'
            onChange={handleChange('email')}
            className='form-control'
            value={email}
            required
          />
        </div>

        <button type='submit' className='btn btn-outline-dark'>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
