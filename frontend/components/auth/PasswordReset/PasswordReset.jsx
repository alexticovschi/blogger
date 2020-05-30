import FormInput from '../../FormInput/FormInput';
import './PasswordReset.scss';

const PasswordReset = ({
  newPassword,
  showSuccessMessage,
  showErrorMessage,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <section className='password-reset'>
      <div className='password-reset__wrapper'>
        <h2 className='password-reset__title'>Reset Password</h2>
        <p className='password-reset__text'>Please enter your new password.</p>
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleInputChange('newPassword')}
            type='password'
            label='New Password'
            value={newPassword}
          />
          <button type='submit' className='password-reset__reset-btn'>
            Reset Password
          </button>
        </form>

        <div className='password-reset__messages'>
          {showSuccessMessage()}
          {showErrorMessage()}
        </div>
      </div>
    </section>
  );
};

export default PasswordReset;
