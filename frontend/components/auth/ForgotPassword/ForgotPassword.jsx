import FormInput from '../../FormInput/FormInput';
import './ForgotPassword.scss';

const ForgotPassword = (props) => {
  const {
    showSuccessMessage,
    showErrorMessage,
    handleSubmit,
    handleInputChange,
    email,
  } = props;

  return (
    <div className='forgot-password'>
      <div>
        <h2 className='forgot-password__title'>Forgot Password</h2>
        <p className='forgot-password__text'>
          Please enter your email address to request a pasword reset.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleInputChange('email')}
            type='email'
            label='Email'
            value={email}
          />
          <button type='submit' className='forgot-password__btn'>
            Request Password Reset
          </button>
        </form>

        <div className='forgot-password__messages'>
          {showSuccessMessage()}
          {showErrorMessage()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
