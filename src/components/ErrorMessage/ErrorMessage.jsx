import css from './ErrorMessage.module.css';

const ErrorMessage = ({ error }) => {
  return (
    <div>
      <h3 className={css.error}>{error}</h3>
    </div>
  );
};

export default ErrorMessage;
