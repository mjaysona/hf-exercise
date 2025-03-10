import './index.css';

export const Card = ({ children, title}) => {
  return (
    <div className='card'>
      {title && <h1>{title}</h1>}
      {children}      
    </div>
  );
};