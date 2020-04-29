import './ActivateAccount.scss';

const ActivateAccount = ({
  name,
  handleSubmit,
  showLoading,
  success,
  showButton,
  error,
}) => {
  return (
    <section className='activate-account'>
      <div className='activate-account__wrapper'>
        <h3 className='activate-account__info'>
          Hey {name}, ready to activate your account?
        </h3>
        {/* {showLoading()} */}

        {error && <p className='activate-account__error-message'>{error}</p>}

        {success && (
          <p className='activate-account__success-message'>
            You have successfully activated your account. Please sign in
          </p>
        )}

        {showButton && (
          <button onClick={handleSubmit} className='activate-account__btn'>
            Activate Account
          </button>
        )}
      </div>
    </section>
  );
};

export default ActivateAccount;
