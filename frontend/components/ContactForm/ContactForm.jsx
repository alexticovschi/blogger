import { useState } from 'react';
import { emailContactForm } from '../../actions/form';
import FormInput from '../FormInput/FormInput';
import TextareaInput from './TextareaInput/TextareaInput';
import './ContactForm.scss';
import { toast } from 'react-toastify';

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

  const notifyError = () => {
    toast(<h3 className='contact-form__toast-error'>{error}</h3>, {
      type: toast.TYPE.ERROR,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    });
    setValues({ ...values, error: false });
  };

  const notifySuccess = () =>
    toast(
      <h3 className='contact-form__toast-success'>
        Thank you for contacting us.
      </h3>,
      {
        type: toast.TYPE.SUCCESS,
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        closeButton: false,
        hideProgressBar: true,
      }
    );
  return (
    <div className='contact-form'>
      <div className='contact-form__banner'>
        <h2 className='contact-form__title'>Contact Us</h2>
      </div>

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
      <div className='contact-form__notify-message'>
        {success ? notifySuccess() : null}
        {error ? notifyError() : null}
      </div>
    </div>
  );
};

export default ContactForm;
