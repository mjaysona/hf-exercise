import './index.css';

export const Button = ({ onClickCallback, children, type }) => {
  const handleClick = () => {
    onClickCallback();
  };

  return (
    <button onClick={handleClick} className={`button button__${type}`}>
      {children}
    </button>
  );
};