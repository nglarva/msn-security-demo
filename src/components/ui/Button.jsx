import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  // Lấy trạng thái darkMode từ context
  const { darkMode } = useContext(ThemeContext);
  
  // Xác định class dựa trên variant
  let buttonClass = 'btn';
  
  if (variant === 'primary') {
    buttonClass += ' btn-primary';
  } else if (variant === 'outline') {
    buttonClass += ' btn-outline';
  } else if (variant === 'toggle-theme') {
    buttonClass += darkMode ? ' btn-light' : ' btn-dark';
  }
  
  // Thêm class tùy chỉnh
  if (className) {
    buttonClass += ` ${className}`;
  }
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
