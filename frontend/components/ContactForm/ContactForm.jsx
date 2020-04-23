import { useState } from 'react';
import { emailContactForm } from '../../actions/form';
import FormInput from '../FormInput/FormInput';
import TextareaInput from './TextareaInput/TextareaInput';
import './ContactForm.scss';

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValues({ ...values, buttonText: 'Sending...' });
    let sentEmail = await emailContactForm({
      authorEmail,
      name,
      email,
      message,
    });

    if (sentEmail.success) {
      setValues({
        ...values,
        sent: true,
        name: '',
        email: '',
        message: '',
        buttonText: 'Message Sent',
        success: sentEmail.success,
      });
    } else {
      setValues({ ...values, error: sentEmail.error });
    }
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: 'Send Message',
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
    <div className='contact-form'>
      <div className='contact-form__banner'>
        <h2 className='contact-form__title'>Contact Us</h2>
      </div>
      {showSuccessMessage()}
      {showErrorMessage()}

      <div className='contact-form__form-wrapper'>
        <form onSubmit={handleSubmit}>
          <TextareaInput
            type='text'
            label='Message'
            value={message}
            onChange={handleChange('message')}
            rows='10'
            required
          />
          <FormInput
            type='text'
            value={name}
            label='Name'
            onChange={handleChange('name')}
            required
          />

          <FormInput
            type='text'
            value={email}
            label='Email'
            onChange={handleChange('email')}
            required
          />

          <button type='submit' className='contact-form__contact-btn'>
            {buttonText}
          </button>
        </form>

        <div className='contact-form__right-container'>
          <ul className='contact-form__contact-options'>
            <li>
              <a
                className='contact-form__contact-options--link'
                href='https://www.facebook.com/'
              >
                <img
                  className='contact-form__contact-options__icon'
                  src='images/social-icons/facebook.svg'
                  alt=''
                />{' '}
                <span>/bloggingcoder.com</span>
              </a>
            </li>
            <li>
              <a
                className='contact-form__contact-options--link'
                href='https://www.twitter.com/'
              >
                <img
                  className='contact-form__contact-options__icon'
                  src='images/social-icons/twitter.svg'
                  alt=''
                />
                <span>@bloggingcoder</span>
              </a>
            </li>
            <li>
              <a
                className='contact-form__contact-options--link'
                href='https://www.linkedin.com/'
              >
                <img
                  className='contact-form__contact-options__icon'
                  src='images/social-icons/linkedin.svg'
                  alt=''
                />
                <span>bloggingcoder-com</span>
              </a>
            </li>
            <li>
              <a
                className='contact-form__contact-options--link'
                href='mailto:hello@bloggingcoder.com'
              >
                <img
                  className='contact-form__contact-options__icon'
                  src='images/social-icons/email.svg'
                  alt=''
                />
                <span>@bloggingcoder.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
